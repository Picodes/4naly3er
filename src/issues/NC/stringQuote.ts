import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'stringQuote',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Strings should use double quotes rather than single quotes',
  description:
    'See the Solidity Style Guide: https://docs.soliditylang.org/en/v0.8.20/style-guide.html#other-recommendations',
  regex: /(?<!.*import.*)'.*'/gi,
};

export default issue;
