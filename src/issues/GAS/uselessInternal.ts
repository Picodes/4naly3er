import { ContractDefinition } from 'solidity-ast';
import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC, topLevelFiles } from '../../utils';

const issue: ASTIssue = {
  id: 'uselessInternal',
  regexOrAST: 'AST',
  type: IssueTypes.GAS,
  title: '`internal` functions not called by the contract should be removed',
  description:
    'If the functions are required by an interface, the contract should inherit from that interface and use the `override` keyword',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    const containsCallTo = (name: string, ast: ContractDefinition): boolean => {
      let res = false;
      for (const functionCall of findAll('FunctionCall', ast)) {
        if (functionCall.expression.nodeType === 'Identifier' && functionCall.expression.name === name) {
          res = true;
        }
      }
      return res;
    };

    for (const file of files) {
      if (!!file.ast) {
        for (const contract of findAll('ContractDefinition', file.ast)) {
          for (const func of findAll('FunctionDefinition', contract)) {
            if (func.visibility === 'internal' && !func.virtual && func.name !== '' && !func.overrides) {
              const functionName = func.name;
              let usedInternally = containsCallTo(functionName, contract);

              if (!usedInternally) {
                /** Extract contracts extending this one */
                for (const topLevelFile of topLevelFiles(contract.id, files)) {
                  for (const topContract of findAll('ContractDefinition', topLevelFile.ast)) {
                    usedInternally = usedInternally || containsCallTo(functionName, topContract);
                  }
                }
                if (!usedInternally) {
                  instances.push(instanceFromSRC(file, func.src));
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
