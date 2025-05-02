import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'shiftInsteadOfDiv',
  regexOrAST: 'Regex',
  type: IssueTypes.GAS,
  title: 'Use shift right/left instead of division/multiplication if possible',
  description:
    "While the `DIV` / `MUL` opcode uses 5 gas, the `SHR` / `SHL` opcode only uses 3 gas. Furthermore, beware that Solidity's division operation also includes a division-by-0 prevention which is bypassed using shifting. Eventually, overflow checks are never performed for shift operations as they are done for arithmetic operations. Instead, the result is always truncated, so the calculation can be unchecked in Solidity version `0.8+`\n- Use `>> 1` instead of `/ 2`\n- Use `>> 2` instead of `/ 4`\n- Use `<< 3` instead of `* 8`\n- ...\n- Use `>> 5` instead of `/ 2^5 == / 32`\n- Use `<< 6` instead of `* 2^6 == * 64`\n\nTL;DR:\n- Shifting left by N is like multiplying by 2^N (Each bits to the left is an increased power of 2)\n- Shifting right by N is like dividing by 2^N (Each bits to the right is a decreased power of 2)\n\n*Saves around 2 gas + 20 for unchecked per instance*",
  regex: /(?<!\/\/.+)((?<!\*)\*|(?<!\/)\/) ?(2|4|8|(16)|(32)|(64)|(128)|(256)|(512)|(1024)|(2048))\D/gi,
};

export default issue;
