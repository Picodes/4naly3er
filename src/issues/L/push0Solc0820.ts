import { InputType, IssueTypes, Instance, ASTIssue } from '../../types';
import { findAll } from 'solidity-ast/utils';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'push0Solc0820',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Solidity version 0.8.20+ may not work on other chains due to `PUSH0`',
  description:
    'The compiler for Solidity 0.8.20 switches the default target EVM version to [Shanghai](https://blog.soliditylang.org/2023/05/10/solidity-0.8.20-release-announcement/#important-note), which includes the new `PUSH0` op code. This op code may not yet be implemented on all L2s, so deployment on these chains will fail. To work around this issue, use an earlier [EVM](https://docs.soliditylang.org/en/v0.8.20/using-the-compiler.html?ref=zaryabs.com#setting-the-evm-version-to-target) [version](https://book.getfoundry.sh/reference/config/solidity-compiler#evm_version). While the project itself may or may not compile with 0.8.20, other projects with which it integrates, or which extend this project may, and those projects will have problems deploying these contracts/libraries.',
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
          // Look for Address(X).balance
          let indexOf0point8 = node.literals.indexOf('0.8');
          let indexOfFloating = node.literals.indexOf('^');
          let indexOfSup = node.literals.findIndex(e => e.indexOf(">") > - 1);
          let indexOf20Plus = node.literals.findIndex(e => e.indexOf("2") > - 1);
          if (
            indexOf0point8 > -1 && (indexOfFloating - 1 || indexOfSup - 1 || indexOf20Plus > indexOf0point8)
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
