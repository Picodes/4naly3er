import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'erc721A',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use ERC721A instead ERC721',
  description:
    "ERC721A standard, ERC721A is an improvement standard for ERC721 tokens. It was proposed by the Azuki team and used for developing their NFT collection. Compared with ERC721, ERC721A is a more gas-efficient standard to mint a lot of of NFTs simultaneously. It allows developers to mint multiple NFTs at the same gas price. This has been a great improvement due to Ethereum's sky-rocketing gas fee.\n\n    Reference: https://nextrope.com/erc721-vs-erc721a-2/",
  regex: /import.+openz.+ERC721\.sol/gi,
};

export default issue;
