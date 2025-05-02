import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC } from '../../utils';
import util from 'util';

const issue: ASTIssue = {
  id: 'deprecatedApprove',
  regexOrAST: 'AST',
  type: IssueTypes.L,
  title: 'Deprecated approve() function',
  description:
    "Due to the inheritance of ERC20's approve function, there's a vulnerability to the ERC20 approve and double spend front running attack. Briefly, an authorized spender could spend both allowances by front running an allowance-changing transaction. Consider implementing OpenZeppelin's `.safeApprove()` function to help mitigate this.",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const fd of findAll('FunctionDefinition', file.ast)) {
          if (fd.kind == 'constructor') {
            continue;
          }
          for (const a of findAll('FunctionCall', fd)) {
            if (a.expression && a.expression['memberName'] == 'approve') {
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
