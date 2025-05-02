import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import util from 'util';
import { instanceFromSRC } from '../../utils';

//@note trop fier de moi
const issue: ASTIssue = {
  id: 'redundantNamedReturn',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Adding a `return` statement when the function defines a named return variable, is redundant',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionDefinition', file.ast)) {
          if (
            a.returnParameters &&
            a.returnParameters.parameters &&
            a.returnParameters.parameters[0] &&
            a.returnParameters.parameters[0].name
          ) {
            for (const b of findAll('Return', a)) {
              if (a.documentation && a.documentation.src) {
                instances.push(instanceFromSRC(file, a.documentation && a.documentation.src, b.src));
              } else {
                instances.push(instanceFromSRC(file, a.src, b.src));
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
