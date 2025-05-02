import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC, lineFromIndex } from '../../utils';

const issue: ASTIssue = {
  id: 'staleOracleData',
  regexOrAST: 'AST',
  type: IssueTypes.M,
  title: "Chainlink's `latestRoundData` might return stale or incorrect results",
  description:
    "- This is a common issue: https://github.com/code-423n4/2022-12-tigris-findings/issues/655, https://code4rena.com/reports/2022-10-inverse#m-17-chainlink-oracle-data-feed-is-not-sufficiently-validated-and-can-return-stale-price, https://app.sherlock.xyz/audits/contests/41#issue-m-12-chainlinks-latestrounddata--return-stale-or-incorrect-result and many more occurrences.\n\n`latestRoundData()` is used to fetch the asset price from a Chainlink aggregator, but it's missing additional validations to ensure that the round is complete. If there is a problem with Chainlink starting a new round and finding consensus on the new value for the oracle (e.g. Chainlink nodes abandon the oracle, chain congestion, vulnerability/attacks on the Chainlink system) consumers of this contract may continue using outdated stale data / stale prices.\n\nMore bugs related to chainlink here: [Chainlink Oracle Security Considerations](https://medium.com/cyfrin/chainlink-oracle-defi-attacks-93b6cb6541bf#99af)",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('VariableDeclarationStatement', file.ast)) {
          let isLatestRoundData = false;
          for (const b of findAll('FunctionCall', a)) {
            if (b.expression && b.expression['memberName'] == 'latestRoundData') {
              isLatestRoundData = true;
              for (const as of a.assignments) {
                if (!as) {
                  let inst = instanceFromSRC(file, a.src, '' + (Number(a.src.split(':')[0]) + 120));
                  instances.push(inst);
                  break;
                }
              }
            }
            if (isLatestRoundData) {
              break;
            }
          }
        }
      }
    }
    return instances;
  },
};

export default issue;
