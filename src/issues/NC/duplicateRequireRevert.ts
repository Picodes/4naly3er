import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'duplicateRequireRevert',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Duplicated `require()`/`revert()` Checks Should Be Refactored To A Modifier Or Function',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    let affectedLines: any = {};
    for (const file of files) {
      if (!!file.ast) {
        for (const functionCall of findAll('FunctionCall', file.ast)) {
          if (functionCall.expression.nodeType === 'Identifier' && functionCall.expression.name === 'require') {
            let counter = 0;
            let typeString =
              functionCall.expression.argumentTypes &&
              functionCall.expression.argumentTypes[1] &&
              functionCall.expression.argumentTypes[1].typeString;
            if (!typeString) {
              continue;
            }
            let requires = new Set<Instance>([instanceFromSRC(file, functionCall.src)]);
            let lines = new Set<number>();
            // instances.push(instanceFromSRC(file, functionCall.src));
            for (const node of findAll('FunctionCall', file.ast)) {
              if (node.expression.nodeType === 'Identifier' && node.expression.name === 'require') {
                let typeString2 =
                  node.expression.argumentTypes &&
                  node.expression.argumentTypes[1] &&
                  node.expression.argumentTypes[1].typeString;
                if (typeString == typeString2) {
                  counter++;
                  if (counter > 1) {
                    requires.add(instanceFromSRC(file, node.src));
                  }
                }
              }
            }
            if (counter > 1) {
              for (let r of requires) {
                if (!affectedLines[r.fileName] || affectedLines[r.fileName].indexOf(r.line) == -1) {
                  affectedLines[r.fileName]
                    ? affectedLines[r.fileName].push(r.line)
                    : (affectedLines[r.fileName] = [r.line]);
                  instances.push(r);
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
