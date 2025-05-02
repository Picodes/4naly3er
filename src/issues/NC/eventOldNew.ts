import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'eventOldNew',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Events that mark critical parameter changes should contain both the old and the new value',
  description: 'This should especially be done if the new value is not required to be different from the old value',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionDefinition', file.ast)) {
          if (a.name.indexOf("set") == 0 || a.name.indexOf("update") == 0) {
            for (const b of findAll('EmitStatement', a)) {
              instances.push(instanceFromSRC(file, a.src, b.src));
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
