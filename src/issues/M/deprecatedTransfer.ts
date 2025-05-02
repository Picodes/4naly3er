import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'deprecatedTransfer',
  regexOrAST: 'AST',
  type: IssueTypes.M,
  title: '`call()` should be used instead of `transfer()` on an `address payable`',
  description:
    'The use of the deprecated `transfer()` function for an address may make the transaction fail due to the 2300 gas stipend',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const b of findAll('FunctionCall', file.ast)) {
          if (b.expression && b.expression['memberName'] == 'transfer' && b.arguments.length == 1) {
            instances.push(instanceFromSRC(file, b.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
