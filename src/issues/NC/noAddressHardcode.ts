import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'noAddressHardcode',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: '`address`s shouldn\'t be hard-coded',
  description: 'It is often better to declare `address`es as `immutable`, and assign them via constructor arguments. This allows the code to remain the same across deployments on different networks, and avoids recompilation when addresses need to change.',
  regex: /0x\S{40}(\)|;)/gi,
};

export default issue;
