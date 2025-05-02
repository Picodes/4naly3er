import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'mathmaxInt',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: '`Math.max(<x>,0)` used with `int` cast to `uint`',
  description:
    "The code casts an `int` to a `uint` before passing it to `Math.max()`. It seems as though the `Math.max()` call is attempting to prevent values from being negative, but since the `int` is being cast to `uint`, the value will never be negative, and instead will overflow if either the multiplication involving the slope and timestamp is positive. I wasn't able to find a scenario where this is the case, but this seems very dangerous, and the `Math.max()` call is sending misleading signals, so I suggest moving it to inside the cast to `uint`",
  regex: /Math.max\(uint.*\(int.*/gi,
};

export default issue;
