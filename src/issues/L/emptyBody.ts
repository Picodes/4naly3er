import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

// regex: /(\{\})|(\{ \})/gi,
const issue: ASTIssue = {
  id: 'emptyBody',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Empty Function Body - Consider commenting why',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface') {
            continue;
          }
          for (const fd of findAll('FunctionDefinition', cd)) {
            if (fd.kind == 'constructor' || fd.virtual || fd.kind == 'fallback' || fd.kind == 'receive') {
              continue;
            }
            if (!fd.body || !fd.body.statements || fd.body.statements.length == 0) {
              if (!fd.documentation || !fd.documentation.text || fd.documentation.text.length == 0) {
                instances.push(instanceFromSRC(file, fd.src));
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
