import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'wstEthPriceStEth',
  regexOrAST: 'Regex',
  type: IssueTypes.H,
  title: "`wstETH`'s functions operate on units of stEth, not Eth",
  impact: "`wstETH`'s functions return values related to [units of stEth](https://docs.lido.fi/contracts/wsteth/#view-methods), not units of Eth. Even after the Shanghai upgrade, the price of stETH is [not the same](https://coinmarketcap.com/currencies/steth/steth/eth/) as the prices of ETH",
  regex: /(price.*\*.*WstETH.*stEthPerToken|WstETH.*stEthPerToken.*\*.*price)/gi,
};

export default issue;