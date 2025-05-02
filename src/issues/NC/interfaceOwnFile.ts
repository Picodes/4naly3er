import { InputType, IssueTypes, Instance, ASTIssue } from '../../types';
import { findAll } from 'solidity-ast/utils';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'interfaceOwnFile',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Interfaces should be defined in separate files from their usage',
  description:
    'The interfaces below should be defined in separate files, so that it\'s easier for future projects to import them, and to avoid duplication later on if they need to be used elsewhere in the project',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('ContractDefinition', file.ast)) {
          if (a.contractKind == 'interface' && file.name.indexOf(a.name) == -1) {
            instances.push(instanceFromSRC(file, a.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
