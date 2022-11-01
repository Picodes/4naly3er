import { InputType, Instance, Issue } from './types';
import { lineFromIndex } from './utils';

const issueTypesTitles = {
  GAS: 'Gas Optimizations',
  NC: 'Non Critical Issues',
  L: 'Low Issues',
  M: 'Medium Issues',
  H: 'High Issues',
};

const analyze = (files: InputType, issues: Issue[]): string => {
  let result = '';
  let analyze: { issue: Issue; instances: Instance[] }[] = [];
  for (const issue of issues) {
    let instances: Instance[] = [];
    // If issue is a regex
    if (issue.regexOrAST === 'Regex') {
      for (const file of files) {
        const matches: any = [...file.content.matchAll(issue.regex)];
        for (const res of matches) {
          // Filter lines that are comments
          const line = [...res.input?.slice(0, res.index).matchAll(/\n/g)!].length;
          const comments = [...res.input?.split('\n')[line].matchAll(/([ \t]*\/\/|[ \t]*\/\*|[ \t]*\*)/g)];
          if (comments.length === 0 || comments?.[0]?.index !== 0) {
            let line = lineFromIndex(res.input, res.index);
            let endLine = undefined;
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
      analyze.push({ issue, instances });
    }
  }

  // Summary
  let c = 0;
  if (analyze.length > 0) {
    result += `\n## ${issueTypesTitles[analyze[0].issue.type]}\n\n`;
    result += '\n| |Issue|Instances|\n|-|:-|:-:|\n';
    for (const { issue, instances } of analyze) {
      result += `| [${issue.type}-${++c}] | ${issue.title} | ${instances.length} |\n`;
    }
  }

  // Issue breakdown
  c = 0;
  for (const { issue, instances } of analyze) {
    result += `### [${issue.type}-${++c}] ${issue.title}\n`;
    if (!!issue.description) {
      result += `${issue.description}\n`;
    }
    if (!!issue.impact) {
      result += '\n#### Impact:\n';
      result += `${issue.impact}\n`;
    }
    result += `\n*Instances (${instances.length})*:\n`;
    let previousFileName = '';
    for (const o of instances.sort((a, b) => {
      if (a.fileName < b.fileName) return -1;
      if (a.fileName > b.fileName) return 1;
      return !!a.line && !!b.line && a.line < b.line ? -1 : 1;
    })) {
      if (o.fileName !== previousFileName) {
        if (previousFileName !== '') {
          result += `\n${'```'}\n\n`;
        }
        result += `${'```'}solidity\nFile: ${o.fileName}\n`;
        previousFileName = o.fileName;
      }

      // Insert code snippet
      const lineSplit = o.fileContent?.split('\n');
      result += `\n${o.line}: ${lineSplit[o.line - 1]}\n`;
      if (!!o.endLine) {
        let currentLine = o.line + 1;
        while (currentLine <= o.endLine) {
          result += `\n${currentLine}: ${lineSplit[currentLine - 1]}\n`;
          currentLine++;
        }
      }
    }
    result += `\n${'```'}\n\n`;
  }

  return result;
};

export default analyze;
