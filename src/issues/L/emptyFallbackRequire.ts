import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

// regex: /(\{\})|(\{ \})/gi,
const issue: ASTIssue = {
  id: 'emptyFallbackRequire',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Empty `receive()/payable fallback()` function does not authenticate requests',
  description:
    'If the intention is for the Ether to be used, the function should call another function, otherwise it should revert (e.g. require(msg.sender == address(weth))). Having no access control on the function means that someone may send Ether to the contract, and have no way to get anything back out, which is a loss of funds. If the concern is having to spend a small amount of gas to check the sender against an immutable address, the code should at least have a function to rescue unused Ether.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface') {
            continue;
          }
          for (const fd of findAll('FunctionDefinition', cd)) {
            if (fd.kind == 'constructor' || fd.virtual) {
              continue;
            }
            if (fd.kind == 'fallback' || fd.kind == 'receive') {
              if (!fd.body || !fd.body.statements || fd.body.statements.length == 0) {
                instances.push(instanceFromSRC(file, fd.src));
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
