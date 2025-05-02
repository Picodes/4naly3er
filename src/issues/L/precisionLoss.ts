import { IssueTypes, RegexIssue } from '../../types';

//@note there will be false positives
const issue: RegexIssue = {
  id: 'precisionLoss',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Loss of precision',
  description:
    'Division by large numbers may result in the result being zero, due to solidity not supporting fractions. Consider requiring a minimum amount for the numerator to ensure that it is always larger than the denominator',
  regex: /(?<!\/\/.*) \/ .*(reserve|balance|block|year|max|total|[A-Z]{2,})/g,
};

export default issue;
