import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'postIncrement',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: '`++i` costs less gas compared to `i++` or `i += 1` (same for `--i` vs `i--` or `i -= 1`)',
  description:
    'Pre-increments and pre-decrements are cheaper.\n\nFor a `uint256 i` variable, the following is true with the Optimizer enabled at 10k:\n\n**Increment:**\n\n- `i += 1` is the most expensive form\n- `i++` costs 6 gas less than `i += 1`\n- `++i` costs 5 gas less than `i++` (11 gas less than `i += 1`)\n\n**Decrement:**\n\n- `i -= 1` is the most expensive form\n- `i--` costs 11 gas less than `i -= 1`\n- `--i` costs 5 gas less than `i--` (16 gas less than `i -= 1`)\n\nNote that post-increments (or post-decrements) return the old value before incrementing or decrementing, hence the name *post-increment*:\n\n```solidity\nuint i = 1;  \nuint j = 2;\nrequire(j == i++, "This will be false as i is incremented after the comparison");\n```\n  \nHowever, pre-increments (or pre-decrements) return the new value:\n  \n```solidity\nuint i = 1;  \nuint j = 2;\nrequire(j == ++i, "This will be true as i is incremented before the comparison");\n```\n\nIn the pre-increment case, the compiler has to create a temporary variable (when used) for returning `1` instead of `2`.\n\nConsider using pre-increments and pre-decrements where they are relevant (meaning: not where post-increments/decrements logic are relevant).\n\n*Saves 5 gas per instance*',
  regex: /\S((?<!(nonce|\/\/|\[).+))(\+\+|--)/gi,
};

export default issue;
