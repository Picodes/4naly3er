import { IssueTypes, RegexIssue } from '../../types';

// Reference: https://github.com/sherlock-audit/2023-04-jojo/blob/6090fef68932b5577abf6b5aa26eb1e579353c57/smart-contract-EVM/contracts/subaccount/Subaccount.sol#L45-L58

// function execute(address to, bytes calldata data, uint256 value) external onlyOwner returns (bytes memory){
//   require(to != address(0));
//   (bool success, bytes memory returnData) = to.call{value: value}(data);
//   if (!success) {
//       assembly {
//           let ptr := mload(0x40)
//           let size := returndatasize()
//           returndatacopy(ptr, 0, size)
//           revert(ptr, size)
//       }
//   }
//   emit ExecuteTransaction(owner, address(this), to, data, value);
//   return returnData;
// }

const issue: RegexIssue = {
  id: 'msgValueWithoutPayable',
  regexOrAST: 'Regex',
  type: IssueTypes.M,
  title: 'Function uses `call{value}` but does not have the `payable` modifier',
  impact:
    'The function uses msg.value indirectly through a `call{value}`, but does not have the payable modifier, which is required for any function that handles ether transfers.',
  regex:
    /function\s+(\w+)\s*\([^)]*\)\s*(external\s+)?(public\s+)?(internal\s+)?(private\s+)?(view\s+)?(pure\s+)?override\s*?(?!\s*payable)[^{]*\{\s*(?:[^}]*\.call\s*\{[^}]*value:[^}]*\}|[^}]*msg\.value[^}]*)[^}]*\}/g,
};

export default issue;