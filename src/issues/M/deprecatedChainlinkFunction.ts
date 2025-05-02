import {IssueTypes} from "../../types";

const issue = {
    id: 'deprecatedChainlinkFunction',
    regexOrAST: 'Regex',
    type: IssueTypes.M,
    title: 'Use of deprecated chainlink function: `latestAnswer()`',
    description: 'According to Chainlink’s documentation [(API Reference)](https://docs.chain.link/data-feeds/api-reference#latestanswer), the latestAnswer function is deprecated. This function does not throw an error if no answer has been reached, but instead returns 0, possibly causing an incorrect price to be fed to the different price feeds or even a Denial of Service.',
    regex: /\.latestAnswer\(\)/g
};

export default issue;
