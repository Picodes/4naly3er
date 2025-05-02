import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'customErrors',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use Custom Errors instead of Revert Strings to save Gas',
  description:
    'Custom errors are available from solidity version 0.8.4. Custom errors save [**~50 gas**](https://gist.github.com/IllIllI000/ad1bd0d29a0101b25e57c293b4b0c746) each time they\'re hit by [avoiding having to allocate and store the revert string](https://blog.soliditylang.org/2021/04/21/custom-errors/#errors-in-depth). Not defining the strings also save deployment gas\n\nAdditionally, custom errors can be used inside and outside of contracts (including interfaces and libraries).\n\nSource: <https://blog.soliditylang.org/2021/04/21/custom-errors/>:\n\n> Starting from [Solidity v0.8.4](https://github.com/ethereum/solidity/releases/tag/v0.8.4), there is a convenient and gas-efficient way to explain to users why an operation failed through the use of custom errors. Until now, you could already use strings to give more information about failures (e.g., `revert("Insufficient funds.");`), but they are rather expensive, especially when it comes to deploy cost, and it is difficult to use dynamic information in them.\n\nConsider replacing **all revert strings** with custom errors in the solution, and particularly those that have multiple occurrences:',
  regex: /(require|revert)\(.*,?".*"\)/gi,
};

export default issue;
