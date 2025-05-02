import main from './main';

/*   .---. ,--.  ,--  / ,---.   ,--.   ,--.'  ,-. .----. ,------.,------, 
    / .  | |   \ |  | | \ /`.\  |  |   `\ . '.' /\_.-,  ||  .---'|   /`. ' 
   / /|  | |  . '|  |)'-'|_.' | |  |     \     /   |_  <(|  '--. |  |_.' | 
  / '-'  |||  |\    |(|  .-.  |(|  '_     /   /) .-. \  ||  .--' |  .   .' 
  `---|  |'|  | \   | |  | |  | |     |`-/   /`  \ `-'  /|  `---.|  |\  \  
    `--' `--'  `--' `--' `--' `-----'  `--'     `---'' `------'`--' '--' */

// ================================= PARAMETERS ================================

import { program } from 'commander';
import { IssueTypes } from './types';

program
  .argument('[basePath]', 'Path were the contracts lies')
  .option('-s, --scope <scopeFile>', '.txt file containing the contest scope')
  .option('-g, --github <githubURL>', 'github url to generate links to code')
  .option('-o, --out <reportPath>', 'Path for Markdown report')
  .option('-l, --listfiles', 'List analyzed files in Markdown Report')
  .option('--legacyscope <scopeFile>', 'Path for legacy scope file')
  .option('--sarif [outputPath]', 'Generate SARIF report, optionally include path to report. Default is analyzer.sarif')
  .option('--skip-info', 'Skip info issues')
  .option('--skip-gas', 'Skip gas issues')
  .option('--skip-low', 'Skip low issues')
  .option('--skip-medium', 'Skip medium issues')
  .option('--skip-high', 'Skip high issues')
  .option('--skip, --skip-detectors <detectorID...>', 'Skip specific detectors by id')
  .action((basePath:string, options) => {
    basePath = basePath ||'contracts/';
    basePath = basePath.endsWith('/') ? basePath : `${basePath}/`;

    const sarif = options.sarif === true ? 'analyzer.sarif' : options.sarif;
    
    const severityToRun: IssueTypes[] = [];
    if(!options.skipInfo) severityToRun.push(IssueTypes.NC);
    if(!options.skipGas) severityToRun.push(IssueTypes.GAS);
    if(!options.skipLow) severityToRun.push(IssueTypes.L);
    if(!options.skipMedium) severityToRun.push(IssueTypes.M);
    if(!options.skipHigh) severityToRun.push(IssueTypes.H);

    const skipDetectors = options.skipDetectors || [];
    const skipDetectorsLower = skipDetectors.map(detector => detector.toLowerCase()); // Convert to lowercase to avoid case-sensitive issues

    console.log(`basePath: ${basePath}`);
    console.log(`scope: ${options.scope||'----'}`);
    console.log(`github: ${options.github||'----'}`);
    console.log(`out: ${options.out||'report.md'}`);
    console.log(`legacyScope: ${options.legacyscope||'----'}`);
    console.log(`sarif: ${options.sarif||'----'}`);
    console.log('Severity to run: ', severityToRun);
    console.log('Skipping detectors: ', skipDetectorsLower);

    console.log('*****************************')
    // ============================== RUN ANALYZER ==============================
    main(basePath, options.scope, options.github, options.out || 'report.md', severityToRun, skipDetectorsLower, options.legacyscope, options.sarif, options.listfiles);
  }).parse();
