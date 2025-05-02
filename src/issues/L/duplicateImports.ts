import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

// regex: /(\{\})|(\{ \})/gi,
const issue: ASTIssue = {
  id: 'duplicateImports',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Duplicate import statements',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const b of findAll('ImportDirective', file.ast)) {
          let counter = 0;
          for (const c of findAll('ImportDirective', file.ast)) {
            if (b.file == c.file) {
              counter++;
              if (counter > 1) {
                instances.push(instanceFromSRC(file, b.src));
                instances.push(instanceFromSRC(file, c.src));
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
