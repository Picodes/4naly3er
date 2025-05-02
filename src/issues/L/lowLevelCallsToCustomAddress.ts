import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'lowLevelCallsToCustomAddress',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title:
    ' Low Level Calls to Custom Addresses',
  description:
    "Contracts should avoid making low-level calls to custom addresses, especially if these calls are based on address parameters in the function. Such behavior can lead to unexpected execution of untrusted code. Instead, consider using Solidity's high-level function calls or contract interactions.",
  regex: /\(\w*\)[.]call\{\w*:\s+\w*\}\(\w*""\)/g,

};

export default issue;
// This is my implementation of the issue M-01 Low level call to Custom address https://github.com/code-423n4/2023-10-ethena/blob/main/bot-report.md?fbclid=IwAR3IkbR6BhKSliDi2r-yRIU4tkGGbIPpBGHX7IA8NOAlMyatBN8o0BGF61I#l-08-function-parameters-in-public-accessible-functions-need-address0-check
//File: contracts/EthenaMinting.sol (bool success,) = (beneficiary).call{value: amount}("");