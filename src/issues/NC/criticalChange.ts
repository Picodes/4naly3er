import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'criticalChange',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Critical Changes Should Use Two-step Procedure',
  description:
    'The critical procedures should be two step process.\n\nSee similar findings in previous Code4rena contests for reference: <https://code4rena.com/reports/2022-06-illuminate/#2-critical-changes-should-use-two-step-procedure>\n\n**Recommended Mitigation Steps**\n\nLack of two-step procedure for critical operations leaves them error-prone. Consider adding two step procedure on the critical functions.',
  regex: /function set.*address.*(owner|admin).*\)/gi,
};

export default issue;
