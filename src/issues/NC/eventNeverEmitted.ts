import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'eventNeverEmitted',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Event is never emitted',
  description: 'The following are defined but never emitted. They can be removed to make the code cleaner.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface' || cd.abstract) {
            continue;
          }
          for (const a of findAll('EventDefinition', cd)) {
            let isCalled = false;
            for (const b of findAll('EmitStatement', cd)) {
              for (const b1 of findAll('Identifier', b)) {
                if (a.name == b1.name) {
                  isCalled = true;
                  break;
                }
              }
              if (isCalled) {
                break;
              }
            }
            if (!isCalled) {
              instances.push(instanceFromSRC(file, a.src));
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
