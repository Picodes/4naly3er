import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'revertWithoutArgument',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: "Take advantage of Custom Error's return value property",
  description:
    'An important feature of Custom Error is that values such as address, tokenID, msg.value can be written inside the () sign, this kind of approach provides a serious advantage in debugging and examining the revert details of dapps such as tenderly.',
  regex: /revert.*\(\)/gi,
};

export default issue;
