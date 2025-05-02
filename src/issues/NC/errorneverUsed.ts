import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC, lineFromIndex } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'errorneverUsed',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Unused `error` definition',
  description:
    "Note that there may be cases where an error superficially appears to be used, but this is only because there are multiple definitions of the error in different files. In such cases, the error definition should be moved into a separate file. The instances below are the unused definitions.",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface' || cd.abstract) {
            continue;
          }

          for (const a of findAll('ErrorDefinition', cd)) {
            let isUsed = false;
            for (const file2 of files) {
              if (!!file2.ast) {
                for (const b of findAll('Identifier', file2.ast)) {
                  if (a.name == b.name) {
                    isUsed = true;
                  }
                }
              }
            }
            if (!isUsed) {
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
