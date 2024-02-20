import * as fs from 'fs';
import issues from './issues';
import { IssueTypes } from './types';

const print = (outputFilePath: string | null = null) => {
  const outputLines: string[] = [];

  for (const t of Object.values(IssueTypes)) {
    let i = 0;
    const typeIssues = issues.filter(i => i.type === t);
    typeIssues.forEach(issue => {
      i++;
      let issueInfo = ` - **${issue.type}-${i} : ${issue.title}**\n`;

      issueInfo += `${issue.impact ? `   ${issue.impact.replace(/\n/g, '\n   ')}\n` : ''}`;
      issueInfo += `${issue.description ? `   ${issue.description.replace(/\n/g, '\n   ')}\n` : ''}`;

      console.log(issueInfo);
      outputLines.push(issueInfo);
    });
  }

  // Write to a file if outputFilePath is provided
  if (outputFilePath) {
    try {
      fs.writeFileSync(outputFilePath, outputLines.join('\n'));
      console.log(`\nIssue titles written to file: ${outputFilePath}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error writing to file: ${error.message}`);
      } else {
        console.error(`Unknown error occurred while writing to file`);
      }
    }
  }
};

export default print;

const outputFilePath = process.argv[2] || null;

print(outputFilePath);
