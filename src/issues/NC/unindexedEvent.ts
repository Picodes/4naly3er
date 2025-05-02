import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import util from 'util';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'unindexedEvent',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Event is missing `indexed` fields',
  description:
    "Index event fields make the field more quickly accessible to off-chain tools that parse events. However, note that each index field costs extra gas during emission, so it's not necessarily best to index the maximum allowed per event (three fields). Each event should use three indexed fields if there are three or more fields, and gas usage is not particularly of concern for the events in question. If there are fewer than three fields, all of the fields should be indexed.",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const event of findAll('EventDefinition', file.ast)) {
          let indexedCount = 0;
          let nonIndexed = false;
          for (const param of event.parameters.parameters) {
            if (param.indexed) {
              indexedCount += 1;
            } else {
              nonIndexed = true;
            }
          }
          if (nonIndexed && indexedCount < 3) {
            instances.push(instanceFromSRC(file, event.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
