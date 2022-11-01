import { InputType, IssueTypes, Instance, ASTIssue } from '../../types';
import { findAll } from 'solidity-ast/utils';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  regexOrAST: 'AST',
  type: IssueTypes.GAS,
  title: 'Use `selfbalance()` instead of `address(this).balance`',
  description:
    "Use assembly when getting a contract's balance of ETH.\n\nYou can use `selfbalance()` instead of `address(this).balance` when getting your contract's balance of ETH to save gas.\nAdditionally, you can use `balance(address)` instead of `address.balance()` when getting an external contract's balance of ETH.\n\n*Saves 15 gas when checking internal balance, 6 for external*",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const node of findAll('MemberAccess', file.ast)) {
          // Look for Address(X).balance
          if (
            node.nodeType === 'MemberAccess' &&
            node.memberName === 'balance' &&
            node.expression.nodeType === 'FunctionCall' &&
            node.expression.typeDescriptions.typeString === 'address'
          ) {
            instances.push(instanceFromSRC(file, node.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
