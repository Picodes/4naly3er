import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.H,
  title: 'Relying on tx.origin for authentication',
  impact:
    'An attacker can trick the user into using the tx.origin variable to authenticate the attacker to the contract, leading to a phishing attack and possible theft of funds.',
  regex: /tx.origin\s*(==|!=)\smsg.sender|msg.sender\s(==|!=)\s*tx.origin/g,
};

export default issue;
