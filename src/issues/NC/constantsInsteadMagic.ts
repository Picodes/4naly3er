import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'constantsInsteadMagic',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: '`constant`s should be defined rather than using magic numbers',
  description:
    'Even [assembly](https://github.com/code-423n4/2022-05-opensea-seaport/blob/9d7ce4d08bf3c3010304a0476a785c70c0e90ae7/contracts/lib/TokenTransferrer.sol#L35-L39) can benefit from using readable constants instead of hex/numeric literals',
  regex: /(?<!(constant|\/\/).*) (?!(0|1\D))\d/gm,
};

export default issue;
