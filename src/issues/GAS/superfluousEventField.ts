import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'superfluousEventField',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Superfluous event fields',
  description:
    '`block.timestamp` and `block.number` are added to event information by default so adding them manually wastes gas',
  regex: /event.+(timestamp|blocknumber)/gi, 
};

export default issue;