import { InputType, IssueTypes, Instance, ASTIssue } from '../../types';
import { findAll } from 'solidity-ast/utils';
import { instanceFromSRC } from '../../utils';

const issue: ASTIssue = {
  id: 'assignUpdateArray',
  regexOrAST: 'AST',
  type: IssueTypes.GAS,
  title: '`array[index] += amount` is cheaper than `array[index] = array[index] + amount` (or related variants)',
  description:
    'When updating a value in an array with arithmetic, using `array[index] += amount` is cheaper than `array[index] = array[index] + amount`.\n\nThis is because you avoid an additional `mload` when the array is stored in memory, and an `sload` when the array is stored in storage.\n\nThis can be applied for any arithmetic operation including `+=`, `-=`,`/=`,`*=`,`^=`,`&=`, `%=`, `<<=`,`>>=`, and `>>>=`.\n\nThis optimization can be particularly significant if the pattern occurs during a loop.\n\n*Saves 28 gas for a storage array, 38 for a memory array*',
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];

    for (const file of files) {
      if (!!file.ast) {
        for (const node of findAll('Assignment', file.ast)) {
          if (
            node.operator === '=' &&
            node.leftHandSide.nodeType === 'IndexAccess' &&
            node.rightHandSide.nodeType === 'BinaryOperation'
            // (node.leftHandSide.typeDescriptions.typeString?.includes('[] storage') ||
            //   node.leftHandSide.typeDescriptions.typeString?.includes('[] memory'))
          ) {
            let array;
            if (node.leftHandSide.baseExpression.nodeType === 'Identifier') {
              array = node.leftHandSide.baseExpression.name;
            }
            let index;
            if (node.leftHandSide.indexExpression?.nodeType === 'Literal') {
              index = node.leftHandSide.indexExpression.value;
            }

            if (node.rightHandSide.rightExpression.nodeType === 'IndexAccess') {
              if (
                (!array ||
                  (node.rightHandSide.rightExpression.baseExpression.nodeType === 'Identifier' &&
                    array === node.rightHandSide.rightExpression.baseExpression.name)) &&
                (!index ||
                  (node.rightHandSide.rightExpression.indexExpression?.nodeType === 'Literal' &&
                    index === node.rightHandSide.rightExpression.indexExpression?.value))
              ) {
                instances.push(instanceFromSRC(file, node.src));
              }
            } else if (node.rightHandSide.leftExpression.nodeType === 'IndexAccess') {
              if (
                (!array ||
                  (node.rightHandSide.leftExpression.baseExpression.nodeType === 'Identifier' &&
                    array === node.rightHandSide.leftExpression.baseExpression.name)) &&
                (!index ||
                  (node.rightHandSide.leftExpression.indexExpression?.nodeType === 'Literal' &&
                    index === node.rightHandSide.leftExpression.indexExpression?.value))
              ) {
                instances.push(instanceFromSRC(file, node.src));
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
