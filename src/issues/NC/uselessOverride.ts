import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title:
    '`override` function arguments that are unused should have the variable name removed or commented out to avoid compiler warnings',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      for (const cd of findAll('ContractDefinition', file.ast)) {
        if (cd.contractKind == 'interface' || cd.abstract) {
          continue;
        }
        for (const a of findAll('FunctionDefinition', file.ast)) {
          if (a.kind == 'constructor' || a.virtual || a.kind == 'fallback' || a.kind == 'receive') {
            continue;
          }
          if (!a.body) {
            continue;
          }
          if (!!a.overrides) {
            for (const b of findAll('ParameterList', a)) {
              if (a.returnParameters && a.returnParameters.id == b.id) {
                continue;
              }
              for (const b1 of findAll('VariableDeclaration', b)) {
                let usesParam = false;
                if (!b1.name) {
                  continue;
                }
                for (const c of findAll('Block', a)) {
                  for (const d of findAll('Identifier', c)) {
                    if (b1.name == d.name) {
                      usesParam = true;
                      break;
                    }
                  }
                  if (usesParam) {
                    break;
                  }
                }

                if (!usesParam) {
                  instances.push(instanceFromSRC(file, b1.src));
                }
              }
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
