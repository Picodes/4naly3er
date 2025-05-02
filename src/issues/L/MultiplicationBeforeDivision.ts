import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes } from '../../types';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'multiplicationBeforeDivision',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Precision Loss due to Division before Multiplication',
  description: 'division operations can lead to a loss of precision as the fractional part is discarded. When the result of such a division operation is then multiplied, this loss of precision can be magnified, potentially leading to significant inaccuracies in the calculations.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const contract of findAll('ContractDefinition', file.ast)) {
          for (const func of findAll('FunctionDefinition', contract)) {
            for (const binaryOp of findAll('BinaryOperation', func)) {
              if (binaryOp.operator === '*') {
                if (
                  (binaryOp.leftExpression && binaryOp.leftExpression.nodeType === 'BinaryOperation' && binaryOp.leftExpression.operator === '/') ||
                  (binaryOp.rightExpression && binaryOp.rightExpression.nodeType === 'BinaryOperation' && binaryOp.rightExpression.operator === '/')
                ) {
                  instances.push(instanceFromSRC(file, binaryOp.src));
                }
              }
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;