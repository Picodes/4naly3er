import fs from 'fs';
import issues, { InputType, Issue, issueTypes, Occurence } from './issues';

// ================================= PARAMETERS ================================

const contractFolder =
  process.argv.length > 2 ? (process.argv[2].endsWith('/') ? process.argv[2] : process.argv[2] + '/') : 'contracts/';
const out = 'report.md';

// ================================= FUNCTIONS =================================

const analyze = (files: { content: string; name: string }[], issues: Issue[]): string => {
  let result = '';
  let counter = 0;
  for (const issue of issues) {
    let occurences: Occurence[] = [];
    if (!!issue.regex) {
      for (const file of files) {
        for (const res of file.content.matchAll(issue.regex)) {
          occurences.push({ fileName: file.name, index: res.index!, fileContent: res.input! });
        }
      }
    } else if (!!issue.detector) {
      occurences = issue.detector(files);
    }

    if (occurences.length > 0) {
      result += `### [${issue.type}-${counter}] ${issue.title}\n`;
      if (!!issue.impact) {
        result += '\n#### Impact:\n';
        result += `${issue.impact}\n`;
      }
      result += '\n#### Occurences:\n';
      for (const o of occurences) {
        let line;
        if (!o.line) {
          line = 1 + [...o.fileContent?.slice(0, o.index).matchAll(/\n/g)!].length;
        } else {
          line = o.line;
        }
        result += ` - ${o.fileName} line ${line}:\n ${'`'}${o.fileContent?.split('\n')[line - 1]}${'`'}\n`;
      }
      result += `\n`;
      counter++;
    }
  }

  return result;
};

// ============================== GENERATE REPORT ==============================

const main = async () => {
  let result = '# Report\n\n';
  let fileNames: string[] = [];

  let directoryQueue = [''];
  while (directoryQueue.length > 0) {
    let dir = directoryQueue.pop();
    let tempFileNames = fs.readdirSync(`${contractFolder}${dir}`);
    for (let fileName of tempFileNames) {
      fileName = `${dir}${fileName}`;
      if (fileName.endsWith('.sol')) {
        fileNames.push(fileName);
      } else if (fs.statSync(`${contractFolder}${fileName}`).isDirectory()) {
        directoryQueue.push(fileName + '/');
      }
    }
  }

  result += '## Files analyzed\n\n';
  fileNames.forEach(fileName => {
    result += ` - ${fileName}\n`;
  });

  result += '\n## Issues\n\n';
  const files: InputType = [];
  fileNames.forEach(fileName => {
    files.push({
      content: fs.readFileSync(`${contractFolder}${fileName}`, { encoding: 'utf8', flag: 'r' }),
      name: fileName,
    });
  });

  for (const t of issueTypes) {
    result += analyze(
      files,
      issues.filter(i => i.type === t),
    );
  }

  console.log(result);
  fs.writeFileSync(out, result);
};

main();
