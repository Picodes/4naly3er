import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'safeTransferOwnership',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Use `Ownable2Step.transferOwnership` instead of `Ownable.transferOwnership`',
  description:
    'Use [Ownable2Step.transferOwnership](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable2Step.sol) which is safer. Use it as it is more secure due to 2-stage ownership transfer.\n\n**Recommended Mitigation Steps**\n\nUse <a href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable2Step.sol">Ownable2Step.sol</a>\n  \n  ```solidity\n      function acceptOwnership() external {\n          address sender = _msgSender();\n          require(pendingOwner() == sender, "Ownable2Step: caller is not the new owner");\n          _transferOwnership(sender);\n      }\n```',
  regex: /import.*Ownable(?!2)|transferOwnership/gi,
};

export default issue;