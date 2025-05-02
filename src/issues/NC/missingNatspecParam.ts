import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'missingNatspecParam',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Incomplete NatSpec: `@param` is missing on actually documented functions',
  description: 'The following functions are missing `@param` NatSpec comments.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const cd of findAll('ContractDefinition', file.ast)) {
          if (cd.contractKind == 'interface') {
            continue;
          }
          for (const a of findAll('FunctionDefinition', file.ast)) {
            if (a.kind == 'constructor' || a.virtual) {
              continue;
            }
            if (
              ['public', 'external'].indexOf(a.visibility) > -1 &&
              ['view', 'pure'].indexOf(a.stateMutability) == -1
            ) {
              if (!!a.documentation && !!a.documentation.text && a.documentation.text.indexOf('@inheritdoc') == -1) {
                let params = a.documentation?.text.split('\n').filter(e => e.indexOf('@param') > -1) || [];
                let parameterss = a.parameters.parameters;
                if (params.length < parameterss.length) {
                  let srcStart = (a.documentation && a.documentation.src) || a.src;
                  instances.push(instanceFromSRC(file, srcStart, parameterss[parameterss.length - 1].src));
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
