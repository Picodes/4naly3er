import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'longRevertString',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Reduce the size of error messages (Long revert Strings)',
  description:
    'Shortening revert strings to fit in 32 bytes will decrease deployment time gas and will decrease runtime gas when the revert condition is met.\n\nRevert strings that are longer than 32 bytes require at least one additional mstore, along with additional overhead for computing memory offset, etc.\n\nConsider shortening the revert strings to fit in 32 bytes.\n\n*Saves around 18 gas per instance*',
  regex: /^((?!import).)*".{33,}"/gi,
};

export default issue;
