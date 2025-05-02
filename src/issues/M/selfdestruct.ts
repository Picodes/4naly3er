import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'selfdestruct',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: 'Used selfdestruct',
  impact: 'Any contract that depends on another smart contract must account for the fact that the other can vanish at any time. Moreover, the SELFDESTRUCT opcode is deprecated and is recommended to no longer be used.',
  regex: /selfdestruct\([a-zA-Z0-9\.\(\)]+\)/g
  ,
};

export default issue;