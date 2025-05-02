import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'someERC20TransferRevertsOn0',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Some tokens may revert when zero value transfers are made',
  description: 'Example: https://github.com/d-xo/weird-erc20#revert-on-zero-value-transfers.\n\nIn spite of the fact that EIP-20 [states](https://github.com/ethereum/EIPs/blob/46b9b698815abbfa628cd1097311deee77dd45c5/EIPS/eip-20.md?plain=1#L116) that zero-valued transfers must be accepted, some tokens, such as LEND will revert if this is attempted, which may cause transactions that involve other tokens (such as batch operations) to fully revert. Consider skipping the transfer if the amount is zero, which will also save gas.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionCall', file.ast)) {
          if (
            a.expression &&
            (a.expression['memberName'] == 'transfer' ||
              a.expression['memberName'] == 'transferFrom' ||
              a.expression['memberName'] == 'safeTransferFrom' ||
              a.expression['memberName'] == 'safeTransfer')
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
