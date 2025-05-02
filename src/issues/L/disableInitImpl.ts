import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'disableInitImpl',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Do not leave an implementation contract uninitialized',
  description:
    'An uninitialized implementation contract can be taken over by an attacker, which may impact the proxy. To prevent the implementation contract from being used, it\'s advisable to invoke the `_disableInitializers` function in the constructor to automatically lock it when it is deployed. This should look similar to this:\n```solidity\n  /// @custom:oz-upgrades-unsafe-allow constructor\n  constructor() {\n      _disableInitializers();\n  }\n```\n\nSources:\n- https://docs.openzeppelin.com/contracts/4.x/api/proxy#Initializable-_disableInitializers--\n- https://twitter.com/0xCygaar/status/1621417995905167360?s=20',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        let isDisabled = false;
        let constructorNodeSrc;
        let foundInitialize = false;
        for (const node of findAll('FunctionDefinition', file.ast)) {
          if (node.name === 'initialize') {
            foundInitialize = true;
          }

          if (node.kind === 'constructor') {
            constructorNodeSrc = node.src;
            for (const node2 of findAll('Identifier', node)) {
              if (node2.name === '_disableInitializers') {
                isDisabled = true;
              }
            }
          }
        }
        if (!isDisabled && constructorNodeSrc && foundInitialize) {
          instances.push(instanceFromSRC(file, constructorNodeSrc));
        }
      }
    }
    return instances;
  },
};

export default issue;
