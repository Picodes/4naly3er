import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { getStorageVariable, instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'extCallLoop',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'External calls in an un-bounded `for-`loop may result in a DOS',
  description: 'Consider limiting the number of iterations in for-loops that make external calls',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const forloop of findAll('ForStatement', file.ast)) {
          for (const functionCall of findAll('FunctionCall', forloop)) {
            if (
              functionCall.expression &&
              functionCall.expression.nodeType == 'MemberAccess' &&
              functionCall.expression.expression &&
              functionCall.expression.expression.nodeType == 'IndexAccess'
            ) {
              instances.push(instanceFromSRC(file, functionCall.src));
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
