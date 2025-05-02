import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'style',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Function writing that does not comply with the Solidity Style Guide',
  description:
    'Order of Functions; ordering helps readers identify which functions they can call and to find the constructor and fallback definitions easier. But there are contracts in the project that do not comply with this.\n\n<https://docs.soliditylang.org/en/v0.8.17/style-guide.html>\n\nFunctions should be grouped according to their visibility and ordered:\n\n- constructor\n- receive function (if exists)\n- fallback function (if exists)\n- external\n- public\n- internal\n- private\n- within a grouping, place the view and pure functions last',
  regex: /^contract .+ \{/gi,
};

export default issue;
