import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'centralizationRisk',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: 'Centralization Risk for trusted owners',
  impact: 'Contracts have owners with privileged rights to perform admin tasks and need to be trusted to not perform malicious updates or drain funds.',
  regex: /( onlyOwner )|( onlyRole\()|( requiresAuth )|(Owned)!?([(, ])|(Ownable)!?([(, ])|(Ownable2Step)!?([(, ])|(AccessControl)!?([(, ])|(AccessControlCrossChain)!?([(, ])|(AccessControlEnumerable)!?([(, ])|(Auth)!?([(, ])|(RolesAuthority)!?([(, ])|(MultiRolesAuthority)!?([(, ])/g,
};

export default issue;
