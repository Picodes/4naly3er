import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'missingNatspec',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'NatSpec is completely non-existent on functions that should have them',
  description: "Public and external functions that aren't view or pure should have NatSpec comments",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface') {
            continue;
          }
          for (const a of findAll('FunctionDefinition', file.ast)) {
            if (a.kind == 'constructor' || a.virtual || a.kind == "fallback" || a.kind == "receive") {
              continue;
            }
            if (
              ['public', 'external'].indexOf(a.visibility) > -1 &&
              ['view', 'pure'].indexOf(a.stateMutability) == -1
            ) {
              if (!a.documentation || !a.documentation.text) {
                instances.push(instanceFromSRC(file, a.src));
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
