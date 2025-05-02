import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'wethHardcode',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'WETH address definition can be use directly',
  description:
    'WETH is a wrap Ether contract with a specific address in the Ethereum network, giving the option to define it may cause false recognition, it is healthier to define it directly.\n\n    Advantages of defining a specific contract directly:\n    \n    It saves gas,\n    Prevents incorrect argument definition,\n    Prevents execution on a different chain and re-signature issues,\n    WETH Address : 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  regex: /(immutable|constant|public).+(weth)/gi,
};

export default issue;
