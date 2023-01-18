// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error UnsafeRouletteError(string message);

contract UnsafeRoulette {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // call spin and send 1 ether to play
    function spin() external {
        // if the block.timestamp is divisible by 7 you win the Ether in the contract
        if (block.timestamp % 7 == 0) {
            (bool sent, ) = msg.sender.call{ value: address(this).balance }("");
            if (!sent) {
                revert UnsafeRouletteError("Failed to send Ether");
            }
        }
    }

    function confirmIsOwner() external view returns (bool) {
        // Relying on tx.origin for authentication
        return msg.sender == tx.origin;
    }
}
