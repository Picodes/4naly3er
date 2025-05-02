import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'mintAndBurnAddress0',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Prevent accidentally burning tokens',
  description: 'Minting and burning tokens to address(0) prevention',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionCall', file.ast)) {
          for (const b of findAll('Identifier', a)) {
            if (b.name.indexOf('mint') > -1 || b.name.indexOf('burn') > -1) {
              instances.push(instanceFromSRC(file, a.src));
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
