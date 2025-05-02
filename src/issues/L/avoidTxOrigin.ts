import {IssueTypes} from "../../types";

const issue = {
    id: 'avoidTxOrigin',
    regexOrAST: 'Regex',
    type: IssueTypes.L,
    title: 'Use of `tx.origin` is unsafe in almost every context',
    description: 'According to [Vitalik Buterin](https://ethereum.stackexchange.com/questions/196/how-do-i-make-my-dapp-serenity-proof), contracts should _not_ `assume that tx.origin will continue to be usable or meaningful`. An example of this is [EIP-3074](https://eips.ethereum.org/EIPS/eip-3074#allowing-txorigin-as-signer-1) which explicitly mentions the intention to change its semantics when it\'s used with new op codes. There have also been calls to [remove](https://github.com/ethereum/solidity/issues/683) `tx.origin`, and there are [security issues](solidity.readthedocs.io/en/v0.4.24/security-considerations.html#tx-origin) associated with using it for authorization. For these reasons, it\'s best to completely avoid the feature.',
    regex: /tx\.origin/g,
};

export default issue;
