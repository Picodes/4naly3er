import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'uselessZeroInit',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Variables need not be initialized to zero',
  description: 'The default value for variables is zero, so initializing them to zero is superfluous.',
  regex: /(uint|address|byte).*(?<!constant.*) = (0|address\(0\)|0x00);/g,
};

export default issue;
