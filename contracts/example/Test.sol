pragma solidity ^0.8.0;

interface IChainlinkAggregatorV3 {
    function latestAnswer() external view returns (int256);
}

contract Test {
    uint256 a = 0;
    uint256[] b;

    function test(address iasd) external returns (uint256) {
        return 123;
    }

    modifier initializer() {
        _;
    }

    function initialize() initializer external {}
    function init() external { }
    function transfer() external {}

    // TODO : Make these vars
    function mathTest() external {
        123 + 123;
        123+123;
        123+ 123;
        123 +123;

        123 - 123;
        123-123;
        123- 123;
        123 -123;

        123 * 123;
        123*123;
        123* 123;
        123 *123;

        123 / 123;
        123/123;
        123/ 123;
        123 /123;

        tx.origin;

        IChainlinkAggregatorV3(msg.sender).latestAnswer();

        b[5];
    }
}