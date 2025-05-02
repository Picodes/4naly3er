import { ContractDefinition } from 'solidity-ast';
import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC, topLevelFiles, getStorageVariable } from '../../utils';

const issue: ASTIssue = {
  id: 'nftRedefinesMint',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: "NFT contract redefines `_mint()`/`_safeMint()`, but not both",
  description:
    "If one of the functions is re-implemented, or has new arguments, the other should be as well. The `_mint()` variant is supposed to skip `onERC721Received()` checks, whereas `_safeMint()` does not. Not having both points to a possible issue with spec-compatibility.",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        let isMint = 0;
        let isSafeMint = 0;
        for (const fd of findAll('FunctionDefinition', file.ast)) {
          if (!!fd.overrides) {
            if (fd.name == "_mint") {
              isMint = 1;
            }
            if (fd.name == "_safeMint") {
              isSafeMint = 1;
            }

            if ((isMint + isSafeMint) == 1) {
              let fdBodyEnd = fd.body && fd.body.statements && fd.body.statements;
              if (!!fdBodyEnd) {
                instances.push(instanceFromSRC(file, fd.src, fdBodyEnd[fdBodyEnd.length - 1].src));
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
