import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'missingSPDX',
  regexOrAST: 'AST',
  type: IssueTypes.NC,
  title: 'File\'s first line is not an SPDX Identifier',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        const content = file.content;
        const split_lines = content.split('\n');
        if (split_lines[0].indexOf('SPDX') == -1) {
          instances.push({ fileName: file.name, line: 1, fileContent: content });
        }
      }
    }
    return instances;
  },
};

export default issue;
