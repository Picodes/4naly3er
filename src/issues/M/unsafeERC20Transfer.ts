import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'unsafeERC20Transfer',
  regexOrAST: 'AST',
  type: IssueTypes.M,
  title: 'Unsafe use of `transfer()`/`transferFrom()` with `IERC20`',
  description:
    "Some tokens do not implement the ERC20 standard properly but are still accepted by most code that accepts ERC20 tokens.  For example Tether (USDT)'s `transfer()` and `transferFrom()` functions on L1 do not return booleans as the specification requires, and instead have no return value. When these sorts of tokens are cast to `IERC20`, their [function signatures](https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca) do not match and therefore the calls made, revert (see [this](https://gist.github.com/IllIllI000/2b00a32e8f0559e8f386ea4f1800abc5) link for a test case). Use OpenZeppelin's `SafeERC20`'s `safeTransfer()`/`safeTransferFrom()` instead",
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
                instances.push(instanceFromSRC(file, a.src));
              }

              // Case of real type
              for (const c of findAll('VariableDeclaration', file.ast)) {
                if (b.name == c.name) {
                  for (const d of findAll('IdentifierPath', c)) {
                    // True only on real types, not cast
                    if (d.name.indexOf('ERC20') > -1) {
                      instances.push(instanceFromSRC(file, a.src));
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
