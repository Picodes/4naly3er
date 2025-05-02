import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'delegateCallInLoop',
  regexOrAST: 'Regex',
  type: IssueTypes.H,
  title: 'Using `delegatecall` inside a loop',
  impact: 'When calling `delegatecall` the same `msg.value` amount will be accredited multiple times.',
  regex: /(for|while|do)[^\(]?(\([^\)]*\))?.?\{(([^\}]*\n)*(([^\}]*\{)([^\{\}]*\n)*([^\{\}]*\}[^\}]*)\n))*[^\}]*delegatecall/g,
         // (for|while|do)            : detects the loop keyword.             "for"
         // [^\(]?(\([^\)]*\))?.?\{   : detects loop conditions.              "(....) {"
         // ([^\}]*\n)*               : detects the line without }.           "......\n"
         // ([^\}]*\{)                : detects start of the line untile {.   ".......{"
         // ([^\{\}]*\n)*             : detects the lines without { and }.    "......\n"
         // ([^\{\}]*\}[^\}]*)\n      : detect the line with }.               "...}..\n"
         // [^\}]*delegatecall        : detect the lien with delegatecall.    "....call"
};

export default issue;
