import fs from 'fs';
import analyze from './analyze';
import compileAndBuildAST from './compile';
import issues from './issues';
import { InputType, IssueTypes } from './types';

/*   .---. ,--.  ,--  / ,---.   ,--.     ,--.'  ,-. .----. ,------.,------, 
    / .  | |   \ |  | | \ /`.\  |  |    (`-')'.'  /\_.-,  ||  .---'|   /`. ' 
   / /|  | |  . '|  |)'-'|_.' | |  |    (   \    /   |_  <(|  '--. |  |_.' | 
  / '-'  |||  |\    |(|  .-.  |(|  '__   |  /   /) .-. \  ||  .--' |  .   .' 
  `---|  |'|  | \   | |  | |  | |     |' `-/   /`  \ `-'  /|  `---.|  |\  \  
    `--' `--'  `--' `--' `--' `-----'    `--'     `---'' `------'`--' '--' */

// ================================= PARAMETERS ================================

const basePath =
  process.argv.length > 2 ? (process.argv[2].endsWith('/') ? process.argv[2] : process.argv[2] + '/') : 'contracts/';
const scopeFile = process.argv.length > 3 && process.argv[3].endsWith('txt') ? process.argv[3] : null;
const out = 'report.md';

// ============================== GENERATE REPORT ==============================

const main = async () => {
  let result = '# Report\n\n';
  let fileNames: string[] = [];

  if (!!scopeFile) {
    // Scope is specified in a .txt file
    const content = fs.readFileSync(scopeFile, { encoding: 'utf8', flag: 'r' });
    fileNames = content.split('\n');
  } else {
    // Scope is not specified: exploration of the folder
    let directoryQueue = [''];
    while (directoryQueue.length > 0) {
      let dir = directoryQueue.pop();
      let tempFileNames = fs.readdirSync(`${basePath}${dir}`);
      for (let fileName of tempFileNames) {
        fileName = `${dir}${fileName}`;
        if (fileName.endsWith('.sol')) {
          fileNames.push(fileName);
        } else if (fs.statSync(`${basePath}${fileName}`).isDirectory()) {
          directoryQueue.push(fileName + '/');
        }
      }
    }
  }

  // Uncomment next lines to have the list of analyzed files in the report

  // result += '## Files analyzed\n\n';
  // fileNames.forEach(fileName => {
  //   result += ` - ${fileName}\n`;
  // });

  // Read file contents and build AST
  const files: InputType = [];
  const asts = await compileAndBuildAST(basePath, fileNames);
  fileNames.forEach((fileName, index) => {
    files.push({
      content: fs.readFileSync(`${basePath}${fileName}`, { encoding: 'utf8', flag: 'r' }),
      name: fileName,
      ast: asts[index],
    });
  });

  for (const t of Object.values(IssueTypes)) {
    result += analyze(
      files,
      issues.filter(i => i.type === t),
    );
  }

  fs.writeFileSync(out, result);
};

main();
