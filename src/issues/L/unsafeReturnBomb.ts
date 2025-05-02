import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'unsafeReturnBomb',
  regexOrAST: 'Regex',
  type: IssueTypes.L,
  title: 'Unsafe solidity low-level call can cause gas grief attack',
  description: "Using the low-level calls of a solidity address can leave the contract open to gas grief attacks. These attacks occur when the called contract returns a large amount of data.\n\nSo when calling an external contract, it is necessary to check the length of the return data before reading/copying it (using `returndatasize()`).",
  regex: /bytes .+\.call\(/gi,
};

export default issue;
