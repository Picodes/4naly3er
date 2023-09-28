import main from './main';

/*   .---. ,--.  ,--  / ,---.   ,--.   ,--.'  ,-. .----. ,------.,------, 
    / .  | |   \ |  | | \ /`.\  |  |   `\ . '.' /\_.-,  ||  .---'|   /`. ' 
   / /|  | |  . '|  |)'-'|_.' | |  |     \     /   |_  <(|  '--. |  |_.' | 
  / '-'  |||  |\    |(|  .-.  |(|  '_     /   /) .-. \  ||  .--' |  .   .' 
  `---|  |'|  | \   | |  | |  | |     |`-/   /`  \ `-'  /|  `---.|  |\  \  
    `--' `--'  `--' `--' `--' `-----'  `--'     `---'' `------'`--' '--' */

// ================================= PARAMETERS ================================

import { program } from 'commander';

program
  .argument('[string]', 'Path were the contracts lies')
  .option('-s, --scope <string>', '.txt file containing the contest scope')
  .option('-g, --github <string>', 'github url to generate links to code')
  .option('-o, --out <string>', 'where to save the report')
  .action((basePath:string, options) => {
    basePath = basePath ||'contracts/';
    basePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
    console.log(`basePath: ${basePath}`);
    console.log(`scope: ${options.scope||'----'}`);
    console.log(`github: ${options.github||'----'}`);
    console.log(`out: ${options.out||'report.md'}`);
    console.log('*****************************')
    // ============================== GENERATE REPORT ==============================
    main(basePath, options.scope, options.gihub, options.out || 'report.md');
  }).parse();
