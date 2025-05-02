import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'delegatecallAddressCheck',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Avoid contract existence checks by using low level calls',
  description:
    "Prior to 0.8.10 the compiler inserted extra code, including `EXTCODESIZE` (**100 gas**), to check for contract existence for external function calls. In more recent solidity versions, the compiler will not insert these checks if the external call has a return value. Similar behavior can be achieved in earlier versions by using low-level calls, since low level calls never check for contract existence",
  regex: /\.delegatecall|\.balanceOf\(|\.recover\(/gi,
};

export default issue;
