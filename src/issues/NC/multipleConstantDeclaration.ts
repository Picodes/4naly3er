import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'multipleConstantDeclaration',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Constant state variables defined more than once',
  description:
    'Rather than redefining state variable constant, consider using a library to store all constants as this will prevent data redundancy',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('VariableDeclaration', file.ast)) {
          if (a.mutability != 'constant') {
            continue;
          }
          for (const file2 of files) {
            if (!!file2.ast && file.ast.absolutePath != file2.ast.absolutePath) {
              for (const b of findAll('VariableDeclaration', file2.ast)) {
                if (b.mutability != 'constant') {
                  continue;
                } else if (b.name == a.name) {
                  instances.push(instanceFromSRC(file, a.src));
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
