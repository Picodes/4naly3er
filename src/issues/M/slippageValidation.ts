import { IssueTypes, RegexIssue } from '../../types';

// Reference: https://github.com/jbx-protocol/juice-buyback/blob/d0ea50010b2f01d1602522e7b3b2e3c9b927b49c/contracts/JBXBuybackDelegate.sol#L196C12-L197

// (,, uint256 _quote, uint256 _slippage) = abi.decode(_data.metadata, (bytes32, bytes32, uint256, uint256));
// uint256 _minimumReceivedFromSwap = _quote - (_quote * _slippage / SLIPPAGE_DENOMINATOR);

const issue: RegexIssue = {
  id: 'slippageValidation',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: 'Lack of slippage validation can lead to user loss of funds',
  impact:
    'The slippage parameter should be validated against its denominator in order to prevent user mistake and potential loss of funds.',
  regex: /function[^{]+\{[^}]*?\b(\w*slippage\w*)\b[^}]*?(?!require\s*\(\s*\1\s*<=)[^}]*?\}/gis,
};

export default issue;