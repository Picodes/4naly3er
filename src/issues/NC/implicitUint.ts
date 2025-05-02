import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'implicitUint',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Change uint to uint256',
  description:
    'Throughout the code base, some variables are declared as `uint`. To favor explicitness, consider changing all instances of `uint` to `uint256`',
  regex: /uint /gi,
};

export default issue;
