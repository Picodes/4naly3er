import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'sensitiveTerms',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Avoid the use of sensitive terms',
  description:
    'Use [alternative variants](https://www.zdnet.com/article/mysql-drops-master-slave-and-blacklist-whitelist-terminology/), e.g. allowlist/denylist instead of whitelist/blacklist',
  regex: /(whitelist|blacklist)/gi,
};

export default issue;
