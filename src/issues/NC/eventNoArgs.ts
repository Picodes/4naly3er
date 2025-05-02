import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'eventNoArgs',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Events should use parameters to convey information',
  description: 'For example, rather than using `event Paused()` and `event Unpaused()`, use `event PauseState(address indexed whoChangedIt, bool wasPaused, bool isNowPaused)`',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('EventDefinition', file.ast)) {
          if (!a.parameters || !a.parameters.parameters || a.parameters.parameters.length == 0)
            instances.push(instanceFromSRC(file, a.src));
        }
      }
    }
    return instances;
  },
};

export default issue;