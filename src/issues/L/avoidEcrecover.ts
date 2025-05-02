import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'avoidEcrecover',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Use of `ecrecover` is susceptible to signature malleability',
  description:
    'The built-in EVM precompile `ecrecover` is susceptible to signature malleability, which could lead to replay attacks.\nReferences:  <https://swcregistry.io/docs/SWC-117>,  <https://swcregistry.io/docs/SWC-121>, and  <https://medium.com/cryptronics/signature-replay-vulnerabilities-in-smart-contracts-3b6f7596df57>.\nWhile this is not immediately exploitable, this may become a vulnerability if used elsewhere.',
  regex: /ecrecover\(/gi,
};

export default issue;
