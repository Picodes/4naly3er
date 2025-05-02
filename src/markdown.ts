import { InputType, Instance, Issue, IssueTypes, Analysis, AnalysisResults } from './types';

// Titles for different issue types
const issueTypesTitles = {
  GAS: 'Gas Optimizations',
  NC: 'Informational Issues',
  L: 'Low Issues',
  M: 'Medium Issues',
  H: 'High Issues',
};


const markdown = (results: AnalysisResults, fileNames?: string[], githubLink?: string): string => {
  let report = '# Report\n\n';

  fileNames ??= [];

  if (fileNames.length > 0) {
    report += files(fileNames);
  }

  for (const t of Object.values(IssueTypes)) {
    let analyses: Analysis[] = results[t] ?? [];
    if(analyses.length > 0) {
      report += markdownPerType(analyses, githubLink);
    }
  }

  return report;
}

const files = (fileNames: string[]): string => {
  let result = ''
  if (fileNames.length > 0){
    result = '## Files analyzed\n\n';
    fileNames.forEach(fileName => {
      result += ` - ${fileName}\n`;
    });
  }
  return result;
}

const markdownPerType = (analyze: Analysis[], githubLink?: string): string => {
  let result = "";

  /** Summary */
  let c = 0;

  result += `\n## ${issueTypesTitles[analyze[0].issue.type]}\n\n`;
  result += '\n| |Issue|Instances|\n|-|:-|:-:|\n';
  for (const { issue, instances } of analyze) {
    c++;
    result += `| [${issue.type}-${c}](#${issue.type}-${c}) | ${issue.title} | ${instances.length} |\n`;
  }

  /** Issue breakdown */
  c = 0;
  for (const { issue, instances } of analyze) {
    c++;
    result += `### <a name="${issue.type}-${c}"></a>[${issue.type}-${c}] ${issue.title}\n`;
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
          result += `\n${'```'}\n`;
          if (!!githubLink) {
            result += `[Link to code](${githubLink + previousFileName})\n`;
          }
          result += `\n`;
        }
        result += `${'```'}solidity\nFile: ${o.fileName}\n`;
        previousFileName = o.fileName;
      }

      // Insert code snippet
      const lineSplit = o.fileContent?.split('\n');
      const offset = o.line.toString().length;
      result += `\n${o.line}: ${lineSplit[o.line - 1]}\n`;
      if (!!o.endLine) {
        let currentLine = o.line + 1;
        while (currentLine <= o.endLine) {
          result += `${' '.repeat(offset)}  ${lineSplit[currentLine - 1]}\n`;
          currentLine++;
        }
      }
    }
    result += `\n${'```'}\n`;
    if (!!githubLink) {
      result += `[Link to code](${githubLink + previousFileName})\n`;
    }
    result += `\n`;
  }

  return result;
}

export default markdown;