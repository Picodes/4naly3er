import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Delete rogue `console.log` imports',
  description: "These shouldn't be deployed in production",
  regex: /console2?\.sol/gi,
};

export default issue;
