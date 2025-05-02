import { findAll } from 'solidity-ast/utils';
import { ASTIssue, InputType, Instance, IssueTypes, RegexIssue } from '../../types';
import { instanceFromSRC, lineFromIndex } from '../../utils';

const issue: ASTIssue = {
  id: 'staleOracleDataL2Sequencer',
  regexOrAST: 'AST',
  type: IssueTypes.M,
  title: "Missing checks for whether the L2 Sequencer is active",
  description:
    "Chainlink recommends that users using price oracles, check whether the Arbitrum Sequencer is [active](https://docs.chain.link/data-feeds/l2-sequencer-feeds#arbitrum). If the sequencer goes down, the Chainlink oracles will have stale prices from before the downtime, until a new L2 OCR transaction goes through. Users who submit their transactions via the [L1 Dealyed Inbox](https://developer.arbitrum.io/tx-lifecycle#1b--or-from-l1-via-the-delayed-inbox) will be able to take advantage of these stale prices. Use a [Chainlink oracle](https://blog.chain.link/how-to-use-chainlink-price-feeds-on-arbitrum/#almost_done!_meet_the_l2_sequencer_health_flag) to determine whether the sequencer is offline or not, and don't allow operations to take place while the sequencer is offline.",
  detector: (files: InputType): Instance[] => {
    let instances: Instance[] = [];
    for (const file of files) {
      if (!!file.ast) {
        for (const a of findAll('VariableDeclarationStatement', file.ast)) {
          let isLatestRoundData = false;
          for (const b of findAll('FunctionCall', a)) {
            if (b.expression && b.expression['memberName'] == 'latestRoundData') {
              isLatestRoundData = true;
              let inst = instanceFromSRC(file, a.src, '' + (Number(a.src.split(':')[0]) + 120));
              instances.push(inst);
              break;
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
