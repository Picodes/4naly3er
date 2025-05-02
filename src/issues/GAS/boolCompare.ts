import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'boolCompare',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Comparing to a Boolean constant',
  description:
    'Comparing to a constant (`true` or `false`) is a bit more expensive than directly checking the returned boolean value.\n\nConsider using `if(directValue)` instead of `if(directValue == true)` and `if(!directValue)` instead of `if(directValue == false)`',
  regex: /(== true)|(== false)/gi, // storage variable | part of mapping | struct
};

export default issue;
