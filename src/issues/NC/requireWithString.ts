import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'requireWithString',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: '`require()` / `revert()` statements should have descriptive reason strings',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        // Revert
        for (const node of findAll('RevertStatement', file.ast)) {
          if (node.errorCall.expression.nodeType !== 'Identifier' || !node.errorCall.expression.name) {
            instances.push(instanceFromSRC(file, node.src));
          }
        }

        // Require
        for (const node of findAll('FunctionCall', file.ast)) {
          if (node.expression.nodeType === 'Identifier' && node.expression.name === 'require' && !node.arguments?.[1]) {
            instances.push(instanceFromSRC(file, node.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
