import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'frontRunnableInitializer',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Initializers could be front-run',
  description: "Initializers could be front-run, allowing an attacker to either set their own values, take ownership of the contract, and in the best case forcing a re-deployment",
  regex: /initialize\(|init\(|(initializer)/g,
};

export default issue;
