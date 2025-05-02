import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'safeMath08',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Deprecated library used for Solidity `>= 0.8` : SafeMath',
  regexPreCondition: /pragma.+0\.8/gi,
  regex: /SafeMath/gi,
};

export default issue;
