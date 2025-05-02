import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'domainSeparatorReplayAttack',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: '`domainSeparator()` isn\'t protected against replay attacks in case of a future chain split ',
  description: "Severity: Low.\nDescription: See <https://eips.ethereum.org/EIPS/eip-2612#security-considerations>.\nRemediation: Consider using the [implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/cryptography/EIP712.sol#L77-L90) from OpenZeppelin, which recalculates the domain separator if the current `block.chainid` is not the cached chain ID.\nPast occurrences of this issue:\n- [Reality Cards Contest](https://github.com/code-423n4/2021-06-realitycards-findings/issues/166)\n- [Swivel Contest](https://github.com/code-423n4/2021-09-swivel-findings/issues/98)\n- [Malt Finance Contest](https://github.com/code-423n4/2021-11-malt-findings/issues/349)",
  regex: /domain.?separator/gi,
};

export default issue;