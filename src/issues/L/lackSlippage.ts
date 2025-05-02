import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'lackSlippage',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Lack of Slippage check',
  regexPreCondition: /UniswapV3Pool|UniswapV2Pool|UniswapV4Pool/gi,
  regex: /amountOutMin.*:.*0/gi,
};

export default issue;
