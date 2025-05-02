import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'timestampReliance',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: 'Timestamp Manipulation',
  impact: 'On proof-of-work chains, miners can change the block timestamp. If critical operations depend upon these timestamps, or they are meant to be used as a source of pseudro-randmoness, they may be unsafe to use on PoW chains.',
  regex: /(block\.timestamp|now|block\.blockhash\(block\.timestamp\))/g
  ,
};

export default issue;