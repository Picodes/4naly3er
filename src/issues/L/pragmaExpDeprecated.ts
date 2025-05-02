import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'pragmaExpDeprecated',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: '`pragma experimental ABIEncoderV2` is deprecated',
  description:
    'Use `pragma abicoder v2` [instead](https://github.com/ethereum/solidity/blob/69411436139acf5dbcfc5828446f18b9fcfee32c/docs/080-breaking-changes.rst#silent-changes-of-the-semantics)',
  regex: /pragma experimental ABIEncoderV2/gi,
};

export default issue;
