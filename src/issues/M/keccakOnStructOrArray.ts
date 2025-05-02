import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'keccakOnStructOrArray',
  regexOrAST: 'AST',
  type: IssueTypes.M,
  title: 'Lack of EIP-712 compliance: using `keccak256()` directly on an array or struct variable',
  description:
    "Directly using the actual variable instead of encoding the array values goes against the EIP-712 specification https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md#definition-of-encodedata. \n**Note**: OpenSea's [Seaport's example with offerHashes and considerationHashes](https://github.com/ProjectOpenSea/seaport/blob/a62c2f8f484784735025d7b03ccb37865bc39e5a/reference/lib/ReferenceGettersAndDerivers.sol#L130-L131) can be used as a reference to understand how array of structs should be encoded.",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('FunctionCall', file.ast)) {
          if (
            a.expression &&
            (a.expression['name'] == 'keccak256' || a.expression['memberName'] == 'keccak256')
          ) {
            for (const b of a.arguments) {
              if (b.typeDescriptions && b.typeDescriptions.typeIdentifier && (b.typeDescriptions.typeIdentifier.indexOf('_struct') > -1 || b.typeDescriptions.typeIdentifier.indexOf('_array') > -1 || b.typeDescriptions.typeIdentifier.indexOf('_map') > -1)) {
                const inst = instanceFromSRC(file, b.src);
                instances.push(inst);
              }
              if (b["arguments"]) {
                for (const c of b["arguments"]) {
                  if (c.typeDescriptions && c.typeDescriptions.typeIdentifier && (c.typeDescriptions.typeIdentifier.indexOf('_struct') > -1 || c.typeDescriptions.typeIdentifier.indexOf('_array') > -1 || c.typeDescriptions.typeIdentifier.indexOf('_map') > -1)) {
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
