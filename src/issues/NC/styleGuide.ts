import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'styleGuide',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: "Contract does not follow the Solidity style guide's suggested layout ordering",
  description:
    'The [style guide](https://docs.soliditylang.org/en/v0.8.16/style-guide.html#order-of-layout) says that, within a contract, the ordering should be:\n\n1) Type declarations\n2) State variables\n3) Events\n4) Modifiers\n5) Functions\n\nHowever, the contract(s) below do not follow this ordering',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        let currentOrder: string[] = [];
        let proposedOrder: string[] = [];
        for (const a of findAll('ContractDefinition', file.ast)) {
          for (const b of a.nodes) {
            let currentString = b.nodeType + '.';
            if (!!b['name']) {
              currentString += b['name'];
            } else if (!!b['typeName'] && !!b['typeName']['pathNode'] && !!b['typeName']['pathNode']['name']) {
              currentString += b['name'] || b['typeName']['pathNode']['name'];
            } else {
              currentString += b['kind'] || (b['libraryName'] && b['libraryName'].name);
            }
            currentOrder.push(currentString);
          }
        }

        currentOrder
          .filter(e => e.indexOf('UsingForDirective') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });
          currentOrder
          .filter(e => e.indexOf('VariableDeclaration') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });
        currentOrder
          .filter(e => e.indexOf('EnumDefinition') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });
        currentOrder
          .filter(e => e.indexOf('StructDefinition') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });

        currentOrder
          .filter(e => e.indexOf('ErrorDefinition') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });

        currentOrder
          .filter(e => e.indexOf('EventDefinition') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });
        currentOrder
          .filter(e => e.indexOf('ModifierDefinition') > -1)
          .forEach(e => {
            proposedOrder.push(e);
          });
        currentOrder
          .filter(e => e.indexOf('FunctionDefinition') > -1)
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
