import { InputType, IssueTypes, Instance, ASTIssue } from '../../types';
import { findAll } from 'solidity-ast/utils';
import { getStorageVariable, instanceFromSRC } from '../../utils';
import { Identifier } from 'solidity-ast';

const issue: ASTIssue = {
  id: 'cacheVariable',
  regexOrAST: 'AST',
  type: IssueTypes.GAS,
  title: 'State variables should be cached in stack variables rather than re-reading them from storage',
  description:
    'The instances below point to the second+ access of a state variable within a function. Caching of a state variable replaces each Gwarmaccess (100 gas) with a much cheaper stack read. Other less obvious fixes/optimizations include having local memory caches of state variable structs, or having local caches of state variable contracts/addresses.\n\n*Saves 100 gas per instance*',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const contract of findAll('ContractDefinition', file.ast)) {
          /** Build list of storage variables */
          let storageVariables = getStorageVariable(contract);

          for (const func of findAll('FunctionDefinition', contract)) {
            /** Check all storage reads */
            let identifiers: Identifier[] = [];

            /** Could be an expression */
            for (const expr of findAll('ExpressionStatement', func)) {
              for (const op of [...findAll('Assignment', expr)]) {
                if (op.rightHandSide.nodeType === 'Identifier' && storageVariables.includes(op.rightHandSide.name)) {
                  identifiers.push(op.rightHandSide);
                }
                if (op.rightHandSide.nodeType === 'BinaryOperation') {
                  const bin = op.rightHandSide;
                  if (
                    bin.rightExpression.nodeType === 'Identifier' &&
                    storageVariables.includes(bin.rightExpression.name)
                  ) {
                    identifiers.push(bin.rightExpression);
                  }

                  if (
                    bin.leftExpression.nodeType === 'Identifier' &&
                    storageVariables.includes(bin.leftExpression.name)
                  ) {
                    identifiers.push(bin.leftExpression);
                  }
                }
              }
            }

            /** Could be a declaration */
            for (const decl of findAll('VariableDeclarationStatement', func)) {
              if (decl.initialValue?.nodeType === 'Identifier') {
                identifiers.push(decl.initialValue);
              }
            }

            /** Could be an Call */
            for (const decl of findAll('FunctionCall', func)) {
              for (const id of decl.arguments) {
                if (id.nodeType === 'Identifier') {
                  identifiers.push(id);
                }
              }
            }

            /** Sort */
            identifiers.sort((a, b) => (a.src < b.src ? -1 : 1));

            for (const variableName of storageVariables) {
              /** Check variable isn't local */
              let isStorage = true;
              for (const decl of findAll('VariableDeclaration', func)) {
                if (decl.name === variableName) {
                  isStorage = false;
                }
              }
              /** Check that there is more than 2 reads */
              const occurrences = identifiers.filter(r => r.name === variableName);
              if (isStorage && occurrences?.length > 1) {
                for (let i = 1; i < occurrences.length; i++)
                  instances.push(instanceFromSRC(file, occurrences[i].src));
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
