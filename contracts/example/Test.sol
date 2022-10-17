pragma solidity ^0.8.0;

contract Test {
    uint256 a = 0;

    string b = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    string c = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    string d = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    function test() external {
        uint array[] = [1, 2, 3];
        for (uint256 i = 0; i < array.length; i++) {
            i = i / 2;
            address(this).delegatecall(abi.encodeWithSignature("addBalance(address)", receivers[i]));
        }

        address(this).delegatecall(abi.encodeWithSignature("addBalance(address)", receivers[i]));

        if (i> 0) {
            return false;
        }

        token.transferFrom(msg.sender, address(this), 100);
    }
}