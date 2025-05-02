import { IssueTypes, RegexIssue } from '../../types';

const issue: RegexIssue = {
  id: 'v2728check',
  regexOrAST: 'Regex',
  type: IssueTypes.NC,
  title: 'No need to check that `v == 27` or `v == 28` with `ecrecover`',
  description:
    'This [Tweeter thread from Alex Beregszaszi aka Axic](https://twitter.com/alexberegszaszi/status/1534461421454606336?s=20&t=H0Dv3ZT2bicx00hLWJk7Fg) explains it well and the [Yellow Paper has been changed](https://pbs.twimg.com/media/FUu--C-XEAELc2A?format=jpg&name=large) in direct consequence to it.\n\n> The Yellow Paper makes it look like nothing is checked.\n\n> Digging into the clients, it turns out the precompile actually checks if the value is 27 or 28. No need to do this on the caller side!\n\n> The change has been merged into the Yellow Paper',
  regex: /v.*(!|=)=.*27.*v.*(!|=)=.*28/g,
};

export default issue;
