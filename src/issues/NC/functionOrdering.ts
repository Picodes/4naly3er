import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'functionOrdering',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Function ordering does not follow the Solidity style guide',
  description:
    'According to the [Solidity style guide](https://docs.soliditylang.org/en/v0.8.17/style-guide.html#order-of-functions), functions should be laid out in the following order :`constructor()`, `receive()`, `fallback()`, `external`, `public`, `internal`, `private`, but the cases below do not follow this pattern',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        let currentOrder: string[] = [];
        let proposedOrder: string[] = [];
        for (const a of findAll('FunctionDefinition', file.ast)) {
          if (a.name) {
            currentOrder.push(a.visibility + ' ' + a.name);
          }
        }

        currentOrder
          .filter(e => e.indexOf('external') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });
        currentOrder
          .filter(e => e.indexOf('public') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });
        currentOrder
          .filter(e => e.indexOf('internal') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });
        currentOrder
          .filter(e => e.indexOf('private') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });

        let hasDifference = 0;
        for (let i = 0; i < currentOrder.length; i++) {
          if (currentOrder[i] != proposedOrder[i]) {
            hasDifference = 1;
            break;
          }
        }
        if (hasDifference > 0) {
          let concat = ['\nCurrent order:'];
          concat = concat.concat(currentOrder);
          concat.push('');
          concat.push('Suggested order:');
          concat = concat.concat(proposedOrder);
          instances.push({ fileName: file.name, line: 1, endLine: concat.length + 1, fileContent: concat.join('\n') });
        }
      }
    }
    return instances;
  },
};

export default issue;
