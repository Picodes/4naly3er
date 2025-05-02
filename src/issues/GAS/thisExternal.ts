import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'thisExternal',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use of `this` instead of marking as `public` an `external` function',
  description:
    'Using `this.` is like making an expensive external call. Consider marking the called function as public\n\n*Saves around 2000 gas per instance*',
  regex: /this\.(?!.*selector)/gi,
};

export default issue;
