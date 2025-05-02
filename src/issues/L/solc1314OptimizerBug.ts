import { InputType, IssueTypes, Instance, ASTIssue } from '../../types';
import { findAll } from 'solidity-ast/utils';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'solc1314OptimizerBug',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'File allows a version of solidity that is susceptible to an assembly optimizer bug',
  description:
    'In solidity versions 0.8.13 and 0.8.14, there is an [optimizer bug](https://github.com/ethereum/solidity-blog/blob/499ab8abc19391be7b7b34f88953a067029a5b45/_posts/2022-06-15-inline-assembly-memory-side-effects-bug.md) where, if the use of a variable is in a separate `assembly` block from the block in which it was stored, the `mstore` operation is optimized out, leading to uninitialized memory. The code currently does not have such a pattern of execution, but it does use `mstore`s in `assembly` blocks, so it is a risk for future changes. The affected solidity versions should be avoided if at all possible.',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        let shouldBreak = false;
        for (const a of findAll('ContractDefinition', file.ast)) {
          if (a.contractKind == 'interface' || a.abstract) {
            shouldBreak = true;
            break;
          }
        }
        if (shouldBreak) {
          continue;
        }
        for (const node of findAll('PragmaDirective', file.ast)) {
          let indexOf0point8 = node.literals.indexOf('0.8');
          let indexOfFloating = node.literals.indexOf('^');
          let indexOfSup = node.literals.findIndex(e => e.indexOf(">") > - 1);
          let indexOf20Plus = node.literals.findIndex(e => e.indexOf("2") > - 1);
          let hasMinVer = !!node.literals[indexOf0point8 + 1]; 
          let isLess15 = hasMinVer && parseInt(node.literals[indexOf0point8 + 1].replaceAll(".","")) < 15;
          let is13 = hasMinVer && parseInt(node.literals[indexOf0point8 + 1].replaceAll(".","")) == 13;
          let is14 = hasMinVer && parseInt(node.literals[indexOf0point8 + 1].replaceAll(".","")) == 14;
          if (
            indexOf0point8 > -1 && ((is13 || is14) || ((indexOfFloating - 1 || indexOfSup - 1) && isLess15))
          ) {
            instances.push(instanceFromSRC(file, node.src));
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
