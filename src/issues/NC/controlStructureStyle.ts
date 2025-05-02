import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'controlStructureStyle',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Control structures do not follow the Solidity Style Guide',
  description:
    "See the [control structures](https://docs.soliditylang.org/en/latest/style-guide.html#control-structures) section of the Solidity Style Guide",
  regex: /(if\(|if.*\){|if(?!.*{))/gi,
};

export default issue;
