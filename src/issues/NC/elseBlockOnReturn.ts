import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'elseBlockOnReturn',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: '`else`-block not required',
  description: 'One level of nesting can be removed by not having an else block when the if-block returns',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('IfStatement', file.ast)) {
          if (!a.condition) {
            // if (a.trueBody.)
            instances.push(instanceFromSRC(file, a.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
