import { IssueTypes, RegexIssue } from '../../types';

// Reference: https://github.com/jbx-protocol/juice-buyback/blob/d0ea50010b2f01d1602522e7b3b2e3c9b927b49c/contracts/JBXBuybackDelegate.sol

// function supportsInterface(bytes4 _interfaceId) external pure override returns (bool) {
//   return _interfaceId == type(IJBFundingCycleDataSource).interfaceId
//       || _interfaceId == type(IJBPayDelegate).interfaceId;
// }

const issue: RegexIssue = {
  id: 'supportsInterface',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: 'Contract is not compliant with ERC-165',
  impact:
    'In order to properly implement `supportsInterface` in accordance with the ERC-165, the function MUST return true for the interface ID parameter `0x01ffc9a7` (calculated from `bytes4(keccak256("supportsInterface(bytes4)"))`), or simply `type(ERC165).interfaceId`.',
  regex:
    /function\s+supportsInterface\((bytes4\s+)?.*\)\s+(external\s+)?(public\s+)?(pure\s+|view\s+)?override\s+returns\s*\(bool\)\s*\{(?![^}]*(.*\s*==\s*0x01ffc9a7|.*\s*==\s*type\(ERC165\)\.interfaceId))[^}]*\}/g,
};

export default issue;