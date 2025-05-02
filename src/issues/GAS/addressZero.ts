import { InputType, IssueTypes, Instance, ASTIssue } from '../../types';
import { findAll } from 'solidity-ast/utils';
import { instanceFromSRC } from '../../utils';
import { Expression, SourceUnit } from 'solidity-ast';

const issue: ASTIssue = {
  id: 'addressZero',
  regexOrAST: 'AST',
  type: IssueTypes.GAS,
  title: 'Use assembly to check for `address(0)`',
  description: '*Saves 6 gas per instance*',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    const addressZero = (node: Expression): boolean => {
      return (
        node.nodeType === 'FunctionCall' &&
        node.kind === 'typeConversion' &&
        node.arguments?.[0].nodeType === 'Literal' &&
        node.arguments?.[0].value === '0'
      );
    };

    for (const file of files) {
      if (!!file.ast) {
        for (const node of findAll('BinaryOperation', file.ast)) {
          if (node.operator === '!=' || node.operator === '==') {
            if (addressZero(node.rightExpression) || addressZero(node.leftExpression)) {
              instances.push(instanceFromSRC(file, node.src));
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
