import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'namedMappings',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Consider using named mappings',
  description:
    'Consider moving to solidity version 0.8.18 or later, and using [named mappings](https://ethereum.stackexchange.com/questions/51629/how-to-name-the-arguments-in-mapping/145555#145555) to make it easier to understand the purpose of each mapping',
  regex: /mapping\(\S+ => /g,
};

export default issue;
