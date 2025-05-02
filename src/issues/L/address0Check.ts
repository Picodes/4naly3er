import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { getStorageVariable, instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'address0Check',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Missing checks for `address(0)` when assigning values to address state variables',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const contract of findAll('ContractDefinition', file.ast)) {
          /** Build list of storage variables */
          let storageVariables = getStorageVariable(contract);

          for (const func of findAll('FunctionDefinition', contract)) {
            for (const assign of findAll('Assignment', func)) {
              if (
                assign.leftHandSide.nodeType === 'Identifier' &&
                storageVariables.includes(assign.leftHandSide.name) &&
                assign.leftHandSide.typeDescriptions.typeString === 'address' &&
                assign.rightHandSide.nodeType === 'Identifier'
              ) {
                const assignName = assign.rightHandSide.name;
                let check = false;
                for (const test of findAll('BinaryOperation', func)) {
                  if (
                    (test.operator === '!=' || test.operator === '==') &&
                    ((test.rightExpression.nodeType === 'Identifier' && test.rightExpression.name === assignName) ||
                      (test.leftExpression.nodeType === 'Identifier' && test.leftExpression.name === assignName))
                  ) {
                    check = true;
                  }
                }
                if (!check) instances.push(instanceFromSRC(file, assign.src));
              }
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
