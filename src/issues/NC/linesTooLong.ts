import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'linesTooLong',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'Lines are too long',
  description:
    "Usually lines in source code are limited to [80](https://softwareengineering.stackexchange.com/questions/148677/why-is-80-characters-the-standard-limit-for-code-width) characters. Today's screens are much larger so it's reasonable to stretch this in some cases. Since the files will most likely reside in GitHub, and GitHub starts using a scroll bar in all cases when the length is over [164](https://github.com/aizatto/character-length) characters, the lines below should be split when they reach that length",
  regex: /.{164,}/gi,
};

export default issue;
