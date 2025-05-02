import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'eventNotProperlyIndexed',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Event missing indexed field',
  description:
    "Index event fields make the field more quickly accessible [to off-chain tools](https://ethereum.stackexchange.com/questions/40396/can-somebody-please-explain-the-concept-of-event-indexing) that parse events. This is especially useful when it comes to filtering based on an address. However, note that each index field costs extra gas during emission, so it's not necessarily best to index the maximum allowed per event (three fields). Where applicable, each `event` should use three `indexed` fields if there are three or more fields, and gas usage is not particularly of concern for the events in question. If there are fewer than three applicable fields, all of the applicable fields should be indexed.",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('EventDefinition', file.ast)) {
          if (a.parameters.parameters.length > 0 && a.parameters.parameters.filter(e => e.indexed).length == 0) {
            instances.push(instanceFromSRC(file, a.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
