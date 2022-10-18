import { Instance, Issue, issueTypesTitles } from './issues';

const analyze = (files: { content: string; name: string }[], issues: Issue[]): string => {
  let result = '';
  let analyze: { issue: Issue; instances: Instance[] }[] = [];
  for (const issue of issues) {
    let instances: Instance[] = [];
    if (!!issue.regex) {
      for (const file of files) {
        const matches: any = [...file.content.matchAll(issue.regex)];
        for (const res of matches) {
          // Filter lines that are comments
          const line = [...res.input?.slice(0, res.index).matchAll(/\n/g)!].length;
          const comments = [...res.input?.split('\n')[line].matchAll(/([ \t]*\/\/|[ \t]*\/\*|[ \t]*\*)/g)];
          if (comments.length === 0 || comments?.[0]?.index !== 0) {
            instances.push({ fileName: file.name, index: res.index!, fileContent: res.input! });
          }
        }
      }
    } else if (!!issue.detector) {
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
      return !!a.index && !!b.index && a.index < b.index ? -1 : 1;
    })) {
      if (o.fileName !== previousFileName) {
        if (previousFileName !== '') {
          result += `\n${'```'}\n\n`;
        }
        result += `${'```'}solidity\nFile: ${o.fileName}\n`;
        previousFileName = o.fileName;
      }

      let line;
      if (!o.line) {
        line = 1 + [...o.fileContent?.slice(0, o.index).matchAll(/\n/g)!].length;
      } else {
        line = o.line;
      }
      result += `\n${line}: ${o.fileContent?.split('\n')[line - 1]}\n`;
    }
    result += `\n${'```'}\n\n`;
  }

  return result;
};

export default analyze;
