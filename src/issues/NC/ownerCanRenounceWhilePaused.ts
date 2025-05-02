import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'ownerCanRenounceWhilePaused',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Owner can renounce while system is paused',
  description:
    'The contract owner or single user with a role is not prevented from renouncing the role/ownership while the contract is paused, which would cause any user assets stored in the protocol, to be locked indefinitely.',
  regex: /function.*pause.*onlyOwner/gi,
};

export default issue;
