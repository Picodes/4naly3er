import { ContractDefinition } from 'solidity-ast';
import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC, topLevelFiles, getStorageVariable } from '../../utils';

const issue: RegexIssue = {
  id: 'increaseAllowanceUSDT',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: "`increaseAllowance/decreaseAllowance` won't work on mainnet for USDT",
  description:
    "On mainnet, the mitigation to be compatible with `increaseAllowance/decreaseAllowance` isn't applied: https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7#code, meaning it reverts on setting a non-zero & non-max allowance, unless the allowance is already zero.",
  regex: /increaseAllowance|decreaseAllowance/gi,
};

export default issue;
