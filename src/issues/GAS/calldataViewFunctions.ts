import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'calldataViewFunctions',
  regexOrAST: 'AST',
  type: IssueTypes.GAS,
  title: 'Use calldata instead of memory for function arguments that do not get mutated',
  description:
    "When a function with a `memory` array is called externally, the `abi.decode()` step has to use a for-loop to copy each index of the `calldata` to the `memory` index. Each iteration of this for-loop costs at least 60 gas (i.e. `60 * <mem_array>.length`). Using `calldata` directly bypasses this loop. \n\nIf the array is passed to an `internal` function which passes the array to another internal function where the array is modified and therefore `memory` is used in the `external` call, it's still more gas-efficient to use `calldata` when the `external` function uses modifiers, since the modifiers may prevent the internal functions from being called. Structs have the same overhead as an array of length one. \n\n *Saves 60 gas per instance*",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const node of findAll('FunctionDefinition', file.ast)) {
          if(node.kind == "constructor"){
            continue;
          }
          if (node.visibility === 'external' || node.visibility === 'public') {
            for (const param of Object.values(node.parameters.parameters)) {
              if (param.storageLocation === 'memory') {
                /** Now we have a memory variable, let's check if it is modified during the call  */
                const variableName = param.name;
                let modified = false;
                for (const assign of findAll('Assignment', node)) {
                  const variable = assign.leftHandSide;

                  /** Array */
                  if (
                    variable.nodeType === 'IndexAccess' &&
                    variable.baseExpression.nodeType === 'Identifier' &&
                    variable.baseExpression.name === variableName
                  ) {
                    modified = true;
                  }
                  if (
                    variable.nodeType === 'MemberAccess' &&
                    variable.expression.nodeType === 'Identifier' &&
                    variable.expression.name === variableName
                  ) {
                    modified = true;
                  }
                }
                if (!modified) {
                  instances.push(instanceFromSRC(file, param.src));
                }
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
