import { InputType, IssueTypes, Instance, ASTIssue } from '../../types';
import { findAll } from 'solidity-ast/utils';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'divisionPrecissionLossASTParser',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title:
    'Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator.',
  description:
    'Division by large numbers may result in the result being zero, due to Solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const node of findAll('BinaryOperation', file.ast)) {
          // Look for Address(X).balance
          if (
            node.nodeType === 'BinaryOperation' &&
            node.operator === '/'
            // node.expression.nodeType === 'FunctionCall' &&
            // node.expression.typeDescriptions.typeString === 'address'
          ) {
            instances.push(instanceFromSRC(file, node.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;