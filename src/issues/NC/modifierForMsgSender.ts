import { IssueTypes, RegexIssue } from '../../types';

// Also catches the checks in modifiers and should be an AST detector
const issue: RegexIssue = {
  id: 'modifierForMsgSender',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Use a `modifier` instead of a `require/if` statement for a special `msg.sender` actor',
  description:
    'If a function is supposed to be access-controlled, a `modifier` should be used instead of a `require/if` statement for more readability.',
  regex: /(require|if|assert).*(msg\.sender)/gi,
};

export default issue;
