import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'unclearRequire',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Some require descriptions are not clear',
  description:
    '1. It does not comply with the general require error description model of the project (Either all of them should be debugged in this way, or all of them should be explained with a string not exceeding 32 bytes.)\n2. For debug dapps like Tenderly, these debug messages are important, this allows the user to see the reasons for revert practically.',
  regex: /require.*".{0,3}"/gi,
};

export default issue;
