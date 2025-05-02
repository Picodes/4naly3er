import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'abicoderV2',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'abicoder v2 is enabled by default',
  description:
    'abicoder v2 is considered non-experimental as of Solidity 0.6.0 and it is enabled by default starting with Solidity 0.8.0. Therefore, there is no need to write.',
  regex: /pragma.*abicoder.*v2/gi,
};

export default issue;
