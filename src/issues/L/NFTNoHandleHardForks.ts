import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC, lineFromIndex } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'nftNoHandleHardForks',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'NFT doesn\'t handle hard forks',
  description:
    "When there are hard forks, users often have to go through [many hoops](https://twitter.com/elerium115/status/1558471934924431363) to ensure that they control ownership on every fork. Consider adding `require(1 == chain.chainId)`, or the chain ID of whichever chain you prefer, to the functions below, or at least include the chain ID in the URI, so that there is no confusion about which chain is the owner of the NFT.",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface') {
            continue;
          }
          // All calls to external functions
          for (const fd of findAll('FunctionDefinition', cd)) {
            if (fd.name == "tokenUri") {
              const inst = instanceFromSRC(file, fd.src);
              let str: string = inst.fileContent.split('\n')[inst.line - 1];
              const matches: any = [...str.matchAll(/chainId/gi)];
              if (matches.length == 0) {
                let fdBodyEnd = fd.body && fd.body.statements && fd.body.statements;
                if (!!fdBodyEnd) {
                  instances.push(instanceFromSRC(file, fd.src, fdBodyEnd[fdBodyEnd.length - 1].src));
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
