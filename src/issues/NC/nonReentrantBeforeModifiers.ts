import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'nonReentrantBeforeModifiers',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'The `nonReentrant` `modifier` should occur before all other modifiers',
  description: 'This is a best-practice to protect against reentrancy in other modifiers',
  regex:
    /function.?\([a-zA-Z]*\)[^\}]*[[:space:]]((?!(external[[:space:]]|override[[:space:]]|view[[:space:]]|pure[[:space:]]|internal[[:space:]]|private[[:space:]]))[a-zA-Z]+[[:space:]])+[^\}]*nonReentrant/gi,
};

export default issue;
