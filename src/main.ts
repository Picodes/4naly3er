import * as fs from 'fs';
import analyze from './analyze';
import sarif from './sarif';
import compileAndBuildAST from './compile';
import issues from './issues';
import markdown from './markdown';
import { InputType, IssueTypes, Analysis, AnalysisResults, ReportTypes, Issue } from './types';
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
 * @param sarif optional string with location to save sarif report. If undefined, SARIF generation is skipped.
 * @param listFiles optional boolean, if true list the analyzed files in the markdown report.
 */
const main = async (
  basePath: string,
  scopeFile: string | null,
  githubLink: string | null,
  out: string,
  severityToRun: IssueTypes[],
  skipDetectors: string[],
  scope?: string,
  sarifOut?: string,
  listFiles?: boolean,
) => {
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

  let analysisResultsObj: AnalysisResults = {};

  for (const t of severityToRun) {
    let analyses: Analysis[] = analyze(
      files,
      issues.filter(i => i.type === t && !skipDetectors.includes(i.id.toLowerCase())),
      !!githubLink ? githubLink : undefined,
    );

    // add analyze results for this issue type to the results object
    analysisResultsObj[t] = analyses;
  }

  // Do markdown conversion
  let markdownResult = markdown(analysisResultsObj, listFiles ? fileNames : undefined, githubLink ?? undefined);
  fs.writeFileSync(out, markdownResult);

  if(sarifOut){
    let sarifAnalyses: Analysis[] = [];
  
    for (const t of Object.values(IssueTypes)) {
      sarifAnalyses = sarifAnalyses.concat((analysisResultsObj[t] ?? []));
    }

    let sarifResult = sarif(sarifAnalyses);

    fs.writeFileSync(sarifOut, JSON.stringify(sarifResult, null, 2), 'utf-8');
  }
};

export default main;
