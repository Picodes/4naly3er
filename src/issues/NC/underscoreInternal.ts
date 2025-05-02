import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'underscoreInternal',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Internal and private variables and functions names should begin with an underscore',
  description:
    'According to the Solidity Style Guide, Non-`external` variable and function names should begin with an [underscore](https://docs.soliditylang.org/en/latest/style-guide.html#underscore-prefix-for-non-external-functions-and-variables)',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('VariableDeclaration', file.ast)) {
          if (
            !a.constant &&
            a.stateVariable &&
            (a.visibility == 'internal' || a.visibility == 'private') &&
            !a.constant &&
            a.mutability != 'immutable' &&
            a.name.charAt(0) != '_'
          ) {
            instances.push(instanceFromSRC(file, a.src));
          }
        }

        for (const a of findAll('FunctionDefinition', file.ast)) {
          if (a.kind === 'constructor') {
            continue;
          }

          if ((a.visibility == 'internal' || a.visibility == 'private') && a.name.charAt(0) != '_') {
            instances.push(instanceFromSRC(file, a.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
