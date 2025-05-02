import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC, lineFromIndex } from '../../utils';

const issue: ASTIssue = {
  id: 'msgValueInLoop',
  regexOrAST: 'AST',
  type: IssueTypes.H,
  title: 'Using `msg.value` in a loop',
  description: 'This is a classic dangerous pattern',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('ForStatement', file.ast)) {
          for (const b of findAll('MemberAccess', a)) {
            if (b.memberName == 'value' && b.expression && b.expression['name'] == 'msg') {
              instances.push(instanceFromSRC(file, b.src));
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
