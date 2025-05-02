import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'numericTimeDays',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Numeric values having to do with time should use time units for readability',
  description:
    "There are [units](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#time-units) for seconds, minutes, hours, days, and weeks, and since they're defined, they should be used",
  regex: /uint.+(epoch|expiry|period|warmup|time|delay).+ = \d*;/gi,
};

export default issue;
