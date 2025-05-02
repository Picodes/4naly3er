import { InputType, Instance, Issue, Analysis } from './types';
import { lineFromIndex } from './utils';

const issueTypesTitles = {
  GAS: 'Gas Optimizations',
  NC: 'Non Critical Issues',
  L: 'Low Issues',
  M: 'Medium Issues',
  H: 'High Issues',
};

/***
 * @notice Runs the given issues on files and generate the report markdown string
 * @param githubLink optional url to generate links
 */
const analyze = (files: InputType, issues: Issue[], githubLink?: string): Analysis[] => {
  let result = '';
  let analyze: Analysis[] = [];
  for (const issue of issues) {
    let instances: Instance[] = [];
    // If issue is a regex
    if (issue.regexOrAST === 'Regex') {
      for (const file of files) {
        const matches: any = [...file.content.matchAll(issue.regex)];
        if(!!issue.regexPreCondition) {
          const preConditionMatches: any = [...file.content.matchAll(issue.regexPreCondition)];
          if (preConditionMatches.length == 0) continue;
        }
        for (const res of matches) {
          // Filter lines that are comments
          const line = [...res.input?.slice(0, res.index).matchAll(/\n/g)!].length;
          const comments = [...res.input?.split('\n')[line].matchAll(/([ \t]*\/\/|[ \t]*\/\*|[ \t]*\*)/g)];
          if (comments.length === 0 || comments?.[0]?.index !== 0) {
            let line = lineFromIndex(res.input, res.index);
            let endLine: any;
            if (!!issue.startLineModifier) line += issue.startLineModifier;
            if (!!issue.endLineModifier) endLine = line + issue.endLineModifier;
            instances.push({ fileName: file.name, line, endLine, fileContent: res.input! });
          }
        }
      }
    } else {
      instances = issue.detector(files);
    }

    if (instances.length > 0) {
      // Removing duplicates. May slows things down
      let indexAdjusted = 0;
      for (let i = 1; i < instances.length;) {
        if (
          instances[i - 1].fileName == instances[i].fileName &&
          instances[i - 1].line == instances[i].line &&
          (!instances[i - 1].endLine || !instances[i].endLine || instances[i - 1].endLine == instances[i].endLine)
        ) {
          instances.splice(i - 1, 1);
        } else {
          i++;
        }
      }
      analyze.push({ issue, instances });
    }
  }

  return analyze;
};

export default analyze;
