import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'missingNatspecReturn',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'Incomplete NatSpec: `@return` is missing on actually documented functions',
  description: 'The following functions are missing `@return` NatSpec comments.',
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
                let returns = a.documentation?.text.split('\n').filter(e => e.indexOf('@return') > -1) || [];
                let returnss = a.returnParameters.parameters;
                if (returns.length < returnss.length) {
                  let srcStart = (a.documentation && a.documentation.src) || a.src;
                  instances.push(instanceFromSRC(file, srcStart, returnss[returnss.length - 1].src));
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
