import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'lackReasonableBounds',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Lack of checks in setters',
  description:
    "Be it sanity checks (like checks against `0`-values) or initial setting checks: it's best for Setter functions to have them",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface') {
            continue;
          }
          for (const a of findAll('FunctionDefinition', file.ast)) {
            if (a.kind == 'constructor' || a.virtual) {
              continue;
            }
            if (
              ['view', 'pure'].indexOf(a.stateMutability) == -1 &&
              (a.name.indexOf('set') > -1 || a.name.indexOf('update') > -1)
            ) {
              let isProtected = false;
              for (const b of findAll('IfStatement', a)) {
                isProtected = true;
              }

              for (const b of findAll('Identifier', a)) {
                if (b.name == 'require') {
                  isProtected = true;
                }
              }
              if (!isProtected) {
                let endLine = '' + (a.body && a.body.statements && a.body.statements.length > 0 && a.body.statements[a.body.statements.length - 1].src);
                instances.push(instanceFromSRC(file, a.src, endLine));
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
