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

    function test_delegatecall_inloop_1() payable external {
        uint256 = sum;
        for(uint i=0; i<10 ; i++) {
		
			if(i == 3 ) {
				continue;
			}
			
			if(i == 5 ) {
				continue;
			}
			// some comment
            address(this).delegatecall(); // should be reported
        }

        while(i>0) {
            i = i-1;
			
			if( i == 5) { continue;}

            address(vault).call{value: 0.2}();
			// come comment
            address(this).delegatecall(); // should be reported
        }

        do {
            address(this).delegatecall();  // should be reported
            i = i+1;
        }  while (i < 10) ;
    }

    function test_delegatecall_inloop_2() payable external {
        for(uint i=0; i<10 ; i++) {
		
			if(i == 3 ) {
				continue;
			} // some comment

        } // some comment
        address(this).delegatecall(); // this shouldn't be reported
    }

    function divisionBeforeMultiplication() external {
        12 / 23 * 14;
        12 / (23 * 14);
    }
}