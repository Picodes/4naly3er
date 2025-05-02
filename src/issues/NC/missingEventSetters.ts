import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'missingEventSetters',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Missing Event for critical parameters change',
  description:
    'Events help non-contract tools to track changes, and events prevent users from being surprised by changes.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface') {
            continue;
          }
          for (const a of findAll('FunctionDefinition', file.ast)) {
            if (a.kind == 'constructor' || a.virtual || a.visibility == 'internal' || a.visibility == 'private') {
              continue;
            }
            if (
              ['view', 'pure'].indexOf(a.stateMutability) == -1 &&
              (a.name.indexOf('set') > -1 || a.name.indexOf('update') > -1)
            ) {
              let isEvented = false;
              for (const b of findAll('EmitStatement', a)) {
                isEvented = true;
              }

              if (!isEvented) {
                let endLine = '' + (a.body && a.body.statements && a.body.statements.length > 0  && a.body.statements[a.body.statements.length - 1].src);
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
