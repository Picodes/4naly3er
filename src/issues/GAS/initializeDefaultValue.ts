import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'initializeDefaultValue',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: "Don't initialize variables with default value",
  description:
    'This is only valid for state variables, as memory ones will be taken care of by the compiler.\n\nIf a state variable is not set/initialized, it is assumed to have the default value (`0` for `uint`, `false` for `bool`, `address(0)` for address...). Explicitly initializing it with its default value is an anti-pattern and wastes gas (around **3 gas** per instance).\n\nConsider removing explicit initializations for default values.\n\n*Saves 5000 gas per instance*',
  regex: /^(?!.*\bfor\b).*(int.* = 0|address.* = address\(0\)|bool.* = false)/gi,
};

export default issue;
