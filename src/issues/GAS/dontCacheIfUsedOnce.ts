import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'dontCacheIfUsedOnce',
  regexOrAST: 'AST',
  type: IssueTypes.GAS,
  title: 'Stack variable used as a cheaper cache for a state variable is only used once',
  description:
    "If the variable is only accessed once, it's cheaper to use the state variable directly that one time, and save the **3 gas** the extra stack assignment would spend",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionDefinition', file.ast)) {
          for (const b of findAll('VariableDeclarationStatement', a)) {
            if (
              b.declarations &&
              b.declarations[0] &&
              b.declarations[0].name &&
              b.initialValue &&
              b.initialValue['name']
            ) {
              let isStateVar = 0;
              for (const c of findAll('VariableDeclaration', file.ast)) {
                if ((c.stateVariable  || c.storageLocation == "storage") && b.initialValue['name'] + '' == c.name) {
                  isStateVar++;
                }
              }
              if (isStateVar > 0) {
                let accessCounter = 0;
                for (const c of findAll('Identifier', a)) {
                  if (c.name == b.declarations[0].name) {
                    accessCounter++;
                    // console.log("accessCounter: ",accessCounter);
                  }
                }
                if (accessCounter == 1) {
                  instances.push(instanceFromSRC(file, b.src));
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
