import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'upgradeableMissingGap',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title:
    'Upgradeable contract is missing a `__gap[50]` storage variable to allow for new storage variables in later versions',
  description:
    'See [this](https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps) link for a description of this storage variable. While some contracts may not currently be sub-classed, adding the variable now protects against forgetting to add it in the future.',
    regex: /Upgradeable/gi,
};

export default issue;
