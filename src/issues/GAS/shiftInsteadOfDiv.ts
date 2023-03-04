import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use shift Right/Left instead of division/multiplication if possible',
  description: 'Shifting left by N is like multiplying by 2^N and shifting right by N is like dividing by 2^N',
  regex: /(\*|\/) ?(2|4|8|(16)|(32)|(64)|(128)|(256)|(512)|(1024)|(2048))\D/g,
  startLineModifier: 1,
};

export default issue;
