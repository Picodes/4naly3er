import fs from 'fs';
import analyze from './analyze';
import issues, { InputType, issueTypes } from './issues';

// ================================= PARAMETERS ================================

const contractFolder =
  process.argv.length > 2 ? (process.argv[2].endsWith('/') ? process.argv[2] : process.argv[2] + '/') : 'contracts/';
const out = 'report.md';
const ignore = ['mock', 'interfaces', 'external'];

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
  // Remove ignored files
  fileNames = fileNames.filter(n =>
    ignore.reduce((prev, curr) => {
      if (n.includes(curr)) return false;
      return prev;
    }, true),
  );

  // Uncomment next lines to have the list of analyzed files in the report

  result += '## Files analyzed\n\n';
  fileNames.forEach(fileName => {
    result += ` - ${fileName}\n`;
  });

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
