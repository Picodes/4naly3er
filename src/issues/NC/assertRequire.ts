import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'assertRequire',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: '`require()` should be used instead of `assert()`',
  description:
    'Prior to solidity version 0.8.0, hitting an assert consumes the **remainder of the transaction\'s available gas** rather than returning it, as `require()`/`revert()` do. `assert()` should be avoided even past solidity version 0.8.0 as its [documentation](https://docs.soliditylang.org/en/v0.8.14/control-structures.html#panic-via-assert-and-error-via-require) states that "The assert function creates an error of type Panic(uint256). ... Properly functioning code should never create a Panic, not even on invalid external input. If this happens, then there is a bug in your contract which you should fix. Additionally, a require statement (or a custom error) are more friendly in terms of understanding what happened."',
  regex: /assert\(/gi,
};

export default issue;
