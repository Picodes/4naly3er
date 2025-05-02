import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'mappingStyle',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: '`mapping` definitions do not follow the Solidity Style Guide',
  description:
    "See the [mappings](https://docs.soliditylang.org/en/latest/style-guide.html#mappings) section of the Solidity Style Guide",
  regex: /mapping \(|mapping\( /gi,
};

export default issue;
