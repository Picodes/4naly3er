import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'uncheckedIncrements',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Increments/decrements can be unchecked in for-loops',
  description:
    "In Solidity 0.8+, there's a default overflow check on unsigned integers. It's possible to uncheck this in for-loops and save some gas at each iteration, but at the cost of some code readability, as this uncheck cannot be made inline.\n\n[ethereum/solidity#10695](https://github.com/ethereum/solidity/issues/10695)\n\nThe change would be:\n\n```diff\n- for (uint256 i; i < numIterations; i++) {\n+ for (uint256 i; i < numIterations;) {\n // ...  \n+   unchecked { ++i; }\n}  \n```\n\nThese save around **25 gas saved** per instance.\n\nThe same can be applied with decrements (which should use `break` when `i == 0`).\n\nThe risk of overflow is non-existent for `uint256`.",
  regex: /for.+(\+\+|--)/gi,
};

export default issue;
