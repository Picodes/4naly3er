import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'avoidEncodePacked',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title:
    '`abi.encodePacked()` should not be used with dynamic types when passing the result to a hash function such as `keccak256()`',
  description:
    'Use `abi.encode()` instead which will pad items to 32 bytes, which will [prevent hash collisions](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#non-standard-packed-mode) (e.g. `abi.encodePacked(0x123,0x456)` => `0x123456` => `abi.encodePacked(0x1,0x23456)`, but `abi.encode(0x123,0x456)` => `0x0...1230...456`). "Unless there is a compelling reason, `abi.encode` should be preferred". If there is only one argument to `abi.encodePacked()` it can often be cast to `bytes()` or `bytes32()` [instead](https://ethereum.stackexchange.com/questions/30912/how-to-compare-strings-in-solidity#answer-82739).\nIf all arguments are strings and or bytes, `bytes.concat()` should be used instead',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionCall', file.ast)) {
          if (
            a.expression &&
            (a.expression['name'] == 'encodePacked' || a.expression['memberName'] == 'encodePacked')
          ) {
            for (const b of a.arguments) {
              if (b.typeDescriptions && b.typeDescriptions.typeIdentifier && (
                (b.typeDescriptions.typeIdentifier.indexOf('t_string') > -1)
                || (b.typeDescriptions.typeIdentifier.indexOf('t_struct') > -1)
                || (b.typeDescriptions.typeIdentifier.indexOf('t_bytes_') > -1)
                || (b.typeDescriptions.typeIdentifier.indexOf('_memory_') > -1)
                || (b.typeDescriptions.typeIdentifier.indexOf('_calldata_') > -1)
                )) {
                const inst = instanceFromSRC(file, b.src);
                instances.push(inst);
              }
              if (b["arguments"]) {
                for (const c of b["arguments"]) {
                  if (c.typeDescriptions && c.typeDescriptions.typeIdentifier && c.typeDescriptions.typeIdentifier.indexOf('_struct') > -1) {
                    const inst = instanceFromSRC(file, c.src);
                    instances.push(inst);
                  }
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
