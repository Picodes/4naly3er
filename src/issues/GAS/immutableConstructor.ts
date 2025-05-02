import { ContractDefinition } from 'solidity-ast';
import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC, topLevelFiles, getStorageVariable } from '../../utils';

const issue: ASTIssue = {
  id: 'immutableConstructor',
  regexOrAST: 'AST',
  type: IssueTypes.GAS,
  title: 'State variables only set in the constructor should be declared `immutable`',
  description:
    'Variables only set in the constructor and never edited afterwards should be marked as immutable, as it would avoid the expensive storage-writing operation in the constructor (around **20 000 gas** per variable) and replace the expensive storage-reading operations (around **2100 gas** per reading) to a less expensive value reading (**3 gas**)',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        let storageVariables;
        let assignSrcs = new Map<string, string>();
        for (const contract of findAll('ContractDefinition', file.ast)) {
          /** Build list of storage variables */
          storageVariables = getStorageVariable(contract);
          // Counting assigments in a mapping?
          for (const func of findAll('FunctionDefinition', contract)) {
            if (func.kind === 'constructor') {
              for (const assign of findAll('Assignment', func)) {
                if (
                  assign.leftHandSide.nodeType === 'Identifier' &&
                  storageVariables.includes(assign.leftHandSide.name) &&
                  (!assign.rightHandSide ||
                    !assign.rightHandSide['kind'] ||
                    assign.rightHandSide['kind'] != 'structConstructorCall')
                ) {
                  const assignName = assign.leftHandSide.name;
                  assignSrcs.set(assignName, assign.src);
                }
              }
            }
          }

          for (const func of findAll('FunctionDefinition', contract)) {
            if (func.kind !== 'constructor') {
              for (const assign of findAll('Assignment', func)) {
                if (assign.leftHandSide.nodeType === 'Identifier' && assignSrcs.has(assign.leftHandSide.name)) {
                  const assignName = assign.leftHandSide.name;
                  assignSrcs.set(assignName, '');
                }
              }
            }
          }

          for (const assignSrc of assignSrcs.keys()) {
            const src = assignSrcs.get(assignSrc);
            if (!!src && src != '' && src != 'owner') {
              instances.push(instanceFromSRC(file, src));
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
