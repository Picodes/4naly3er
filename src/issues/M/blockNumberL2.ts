import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'blockNumberL2',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title:
    "`block.number` means different things on different L2s",
  description:
    "On Optimism, `block.number` is the L2 block number, but on Arbitrum, it's the L1 block number, and `ArbSys(address(100)).arbBlockNumber()` must be used. Furthermore, L2 block numbers often occur much more frequently than L1 block numbers (any may even occur on a per-transaction basis), so using block numbers for timing results in inconsistencies, especially when voting is involved across multiple chains. As of version 4.9, OpenZeppelin has [modified](https://blog.openzeppelin.com/introducing-openzeppelin-contracts-v4.9#governor) their governor code to use a clock rather than block numbers, to avoid these sorts of issues, but this still requires that the project [implement](https://docs.openzeppelin.com/contracts/4.x/governance#token_2) a [clock](https://eips.ethereum.org/EIPS/eip-6372) for each L2.",
  regex: /block\.number/gi,
};

export default issue;
