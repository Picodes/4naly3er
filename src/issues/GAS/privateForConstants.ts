import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'privateForConstants',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Using `private` rather than `public` for constants, saves gas',
  description:
    "If needed, the values can be read from the verified contract source code, or if there are multiple values there can be a single getter function that [returns a tuple](https://github.com/code-423n4/2022-08-frax/blob/90f55a9ce4e25bceed3a74290b854341d8de6afa/src/contracts/FraxlendPair.sol#L156-L178) of the values of all currently-public constants. Saves **3406-3606 gas** in deployment gas due to the compiler not having to create non-payable getter functions for deployment calldata, not having to store the bytes of the value outside of where it's used, and not adding another entry to the method ID table",
  regex: /(public.?constant.?|constant.?public.?)[^=\n\(]*(=|;)/g,
};

export default issue;
