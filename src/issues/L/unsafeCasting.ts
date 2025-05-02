// regex: /(u| |-)int(?!256)\d?\d?\d?\(/g,
import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'unsafeCasting',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title:
    'Consider using OpenZeppelin\'s SafeCast library to prevent unexpected overflows when downcasting',
  description:
    "Downcasting from `uint256`/`int256` in Solidity does not revert on overflow. This can result in undesired exploitation or bugs, since developers usually assume that overflows raise errors. [OpenZeppelin's SafeCast library](https://docs.openzeppelin.com/contracts/3.x/api/utils#SafeCast) restores this intuition by reverting the transaction when such an operation overflows. Using this library eliminates an entire class of bugs, so it's recommended to use it always. Some exceptions are acceptable like with the classic `uint256(uint160(address(variable)))`",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionCall', file.ast)) {
          if (a.kind != 'typeConversion') {
            continue;
          }
          let shouldSkip = false;
          for (const b of findAll('Identifier', a)) {
            if (b.name.indexOf('block') > -1 || b.name.indexOf('time') > -1 || b.name.indexOf('Time') > -1) {
              shouldSkip = true;
              break;
            }
          }
          if (shouldSkip) {
            continue;
          }

          for (const b of findAll('ElementaryTypeNameExpression', a)) {
            if (
              b.argumentTypes &&
              b.argumentTypes[0] &&
              (b.argumentTypes[0].typeString == 'uint256' || b.argumentTypes[0].typeString == 'int256')
            ) {
              const inst = instanceFromSRC(file, a.src);
              let str: string = inst.fileContent.split('\n')[inst.line - 1];
              const matches: any = [...str.matchAll(/(u| |-)int(?!256)\d\d?\d?\((?!.*(int256|block|time))/gi)];
              if (matches.length > 0) {
                instances.push(inst);
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
