import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'useOnlyInitializing',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Use `initializer` for public-facing functions only. Replace with `onlyInitializing` on internal functions.',
  description:
    'See [What\'s the difference between onlyInitializing and initializer](https://forum.openzeppelin.com/t/whats-the-difference-between-onlyinitializing-and-initialzer/25789) and https://docs.openzeppelin.com/contracts/4.x/api/proxy#Initializable-onlyInitializing--',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface') {
            continue;
          }
          for (const a of findAll('FunctionDefinition', file.ast)) {
            let modifierIndex = a.modifiers && a.modifiers.findIndex(e => e.modifierName && e.modifierName.name && e.modifierName.name.indexOf("initializer") > -1);
            if (a.visibility == 'internal' && modifierIndex > -1) {
              instances.push(instanceFromSRC(file, a.modifiers[modifierIndex].src));
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
