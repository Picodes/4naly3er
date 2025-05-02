import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'uncheckedERC20Transfer',
  regexOrAST: 'AST',
  type: IssueTypes.M,
  title: 'Return values of `transfer()`/`transferFrom()` not checked',
  description:
    "Not all `IERC20` implementations `revert()` when there's a failure in `transfer()`/`transferFrom()`. The function signature has a `boolean` return value and they indicate errors that way instead. By not checking the return value, operations that should have marked as failed, may potentially go through without actually making a payment",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionCall', file.ast)) {
          if (
            a.expression &&
            (a.expression['memberName'] == 'transfer' || a.expression['memberName'] == 'transferFrom')
          ) {
            for (const b of findAll('Identifier', a)) {
              // Case of cast
              if (b.name.indexOf('ERC20') > -1) {
                const inst = instanceFromSRC(file, a.src);
                let str: string = inst.fileContent.split('\n')[inst.line - 1];
                const matches: any = [...str.matchAll(/bool.+=.+transfer/gi)];
                if (matches.length == 0) {
                  instances.push(inst);
                }
              }

              // Case of real type
              for (const c of findAll('VariableDeclaration', file.ast)) {
                if (b.name == c.name) {
                  for (const d of findAll('IdentifierPath', c)) {
                    if (d.name.indexOf('ERC20') > -1) {
                      const inst = instanceFromSRC(file, a.src);
                      let str: string = inst.fileContent.split('\n')[inst.line - 1];
                      const matches: any = [...str.matchAll(/bool.+=.+transfer/gi)];
                      if (matches.length == 0) {
                        instances.push(inst);
                      }
                    }
                  }
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
