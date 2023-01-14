import fs from 'fs';
import analyze from './analyze';
import compileAndBuildAST from './compile';
import issues from './issues';
import { InputType, IssueTypes } from './types';
import { recursiveExploration } from './utils';

/*   .---. ,--.  ,--  / ,---.   ,--.   ,--.'  ,-. .----. ,------.,------, 
    / .  | |   \ |  | | \ /`.\  |  |   `\ . '.' /\_.-,  ||  .---'|   /`. ' 
   / /|  | |  . '|  |)'-'|_.' | |  |     \     /   |_  <(|  '--. |  |_.' | 
  / '-'  |||  |\    |(|  .-.  |(|  '_     /   /) .-. \  ||  .--' |  .   .' 
  `---|  |'|  | \   | |  | |  | |     |`-/   /`  \ `-'  /|  `---.|  |\  \  
    `--' `--'  `--' `--' `--' `-----'  `--'     `---'' `------'`--' '--' */

// ============================== GENERATE REPORT ==============================

/**
 * @param basePath Path were the contracts lies
 * @param scopeFile .txt file containing the contest scope
 * @param githubLink github url to generate links to code
 * @param out where to save the report
 * @param scope optional text containing the .sol files in scope. Replaces `scopeFile`
 */
const main = async (
  basePath: string,
  scopeFile: string | null,
  githubLink: string | null,
  out: string,
  scope?: string,
) => {
  let result = '# Report\n\n';
  let fileNames: string[] = [];

  if (!!scopeFile || !!scope) {
    // Scope is specified in a .txt file or is passed in a string
    const content = scope ?? fs.readFileSync(scopeFile as string, { encoding: 'utf8', flag: 'r' });
    for (const word of [...content.matchAll(/[a-zA-Z\/\.\-\_0-9]+/g)].map(r => r[0])) {
      if (word.endsWith('.sol') && fs.existsSync(`${basePath}${word}`)) {
        fileNames.push(word);
      }
    }
    if (fileNames.length === 0) throw Error('Scope is empty');
  } else {
    // Scope is not specified: exploration of the folder
    fileNames = recursiveExploration(basePath);
  }

  console.log('Scope: ', fileNames);

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
      !!githubLink ? githubLink : undefined,
    );
  }

  fs.writeFileSync(out, result);
};

export default main;
