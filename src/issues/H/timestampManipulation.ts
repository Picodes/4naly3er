import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.H,
  title: 'Timestamp manipulation vulnerability',
  impact: 'An attacker can manipulate the block timestamp in order to execute arbitrary code or steal funds.',
  regex:
    /if\s*\((\b(block\.timestamp|now)\b)\s*[^)]*\)\s*{[^}]*(call|transfer|send|delegateCall|callcode|callStatic|staticcall)[^}]*}/g,
};

export default issue;
