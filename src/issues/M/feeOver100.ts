import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'feeOver100',
  regexOrAST: 'AST',
  type: IssueTypes.M,
  title: 'Fees can be set to be greater than 100%.',
  description:
    'There should be an upper limit to reasonable fees.\nA malicious owner can keep the fee rate at zero, but if a large value transfer enters the mempool, the owner can jack the rate up to the maximum and sandwich attack a user.',
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
              (a.name.indexOf('Fee') > -1 || a.name.indexOf('fee') > -1)
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
                let endLine = '' + (a.body && a.body.statements && a.body.statements[a.body.statements.length - 1].src);
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
