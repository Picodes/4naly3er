import { IssueTypes, RegexIssue } from '../../types';

//@audit-issue TODO - lots of false positives
const issue: RegexIssue = {
  id: 'upgradeableNotInit',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Upgradeable contract not initialized',
  description:
    'Upgradeable contracts are initialized via an initializer function rather than by a constructor. Leaving such a contract uninitialized may lead to it being taken over by a malicious user',
  regexPreCondition: /import.+Upgradeable|/gi,
  regex: /initialize|Upgradeable|_init\(/gi,
};

export default issue;
