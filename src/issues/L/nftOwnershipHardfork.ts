import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'nftOwnershipHardfork',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'NFT ownership doesn\'t support hard forks',
  description:
    'To ensure clarity regarding the ownership of the NFT on a specific chain, it is recommended to add `require(block.chainid == 1, "Invalid Chain")` or the desired chain ID in the functions below.\n\nAlternatively, consider including the chain ID in the URI itself. By doing so, any confusion regarding the chain responsible for owning the NFT will be eliminated.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionDefinition', file.ast)) {
          if (a.name === 'tokenURI') {
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
    return instances;
  },
};

export default issue;
