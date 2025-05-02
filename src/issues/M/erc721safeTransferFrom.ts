import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'erc721safeTransferFrom',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: 'Using `transferFrom` on ERC721 tokens',
  description:
    "The `transferFrom` function is used instead of `safeTransferFrom` and [it's discouraged by OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/109778c17c7020618ea4e035efb9f0f9b82d43ca/contracts/token/ERC721/IERC721.sol#L84). If the arbitrary address is a contract and is not aware of the incoming ERC721 token, the sent token could be locked.",
  regexPreCondition: /ERC721/gi,
  regex: /\.transferFrom.*,.*,.*Id/gi,
};

export default issue;
