import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'storageVsMemoryStructArray',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use `storage` instead of `memory` for structs/arrays',
  description:
    'Using `memory` copies the struct or array in memory. Use `storage` to save the location in storage and have cheaper reads:',
  regex: /memory.+\=/g,
  startLineModifier: 1,
};

export default issue;
