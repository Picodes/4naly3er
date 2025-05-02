import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'sweepingRescuing',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Sweeping may break accounting if tokens with multiple addresses are used',
  description: "There have been [cases](https://blog.openzeppelin.com/compound-tusd-integration-issue-retrospective/) in the past where a token mistakenly had two addresses that could control its balance, and transfers using one address impacted the balance of the other. To protect against this potential scenario, sweep functions should ensure that the balance of the non-sweepable token does not change after the transfer of the swept tokens.",
  regex: /sweep|recover(ERC|Token)|rescue(ERC|Token)/gi,
};

export default issue;
