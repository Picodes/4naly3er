import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  regexOrAST: 'AST',
  type: IssueTypes.GAS,
  title: 'Use calldata instead of memory for function arguments that do not get mutated',
  description:
    'Mark data types as `calldata` instead of `memory` where possible. This makes it so that the data is not automatically loaded into memory. If the data passed into the function does not need to be changed (like updating values in an array), it can be passed in as `calldata`. The one exception to this is if the argument must later be passed into another function that takes an argument that specifies `memory` storage.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const node of findAll('FunctionDefinition', file.ast)) {
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
