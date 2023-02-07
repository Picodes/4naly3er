import { Configuration, OpenAIApi } from 'openai';
import { InputType, Instance, Issue, IssueTypes } from './types';
import { lineFromIndex } from './utils';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

/***
 * @notice Calls OpenAI api to check for typo in the code
 * @param githubLink optional url to generate links
 */
const checkTypos = async (files: InputType): Promise<{ issue: Issue; instances: Instance[] }> => {
  let instances: Instance[] = [];

  /** Typo checking */
  if (!!process.env.OPENAI_API_KEY) {
    for (const file of files) {
      /** Cut file in 100 lines blocks */
      const lines: { line: string; index: number }[] = file?.content
        .split('\n')
        .map((l, i) => {
          return { line: l, index: i };
        })
        .filter(l => l.line.includes('//'));
      for (let blockIndex = 0; blockIndex < lines.length / 100; blockIndex++) {
        const block = lines.slice(blockIndex * 100, (blockIndex + 1) * 100);
        const blockText = block.reduce((prev, curr) => prev + curr.line + '\n', '');

        try {
          await openai
            .createEdit({
              model: 'code-davinci-edit-001',
              input: blockText,
              instruction: 'Correct typo and grammar in comments',
              temperature: 0,
            })
            .then(response => {
              let result = response?.data?.choices?.[0]?.text ?? '';
              if (result !== blockText) {
                const linesContent = blockText.split('\n').map(l => l.replace(/[\ \t\.]/g, ''));
                const linesResult = result.split('\n').map(l => l.replace(/[\ \t\.]/g, ''));
                for (let i = 0; i < linesContent.length; i++) {
                  for (let j = 0; j < linesContent[i].length; j++) {
                    if (linesContent[i] !== linesResult[i]) {
                      instances.push({
                        fileName: file.name,
                        line: 1 + block[i].index,
                        fileContent: file.content,
                        fix: result.split('\n')[i],
                      });
                      break;
                    }
                  }
                }
              }
            });
        } catch {
          /** Retry */
          await new Promise(r => setTimeout(r, 60 * 1000));
          blockIndex - 1;
        }
      }
      console.log(`Typo analyzed for ${file.name}`);
    }
  } else {
    console.log('Typo check disabled. Please add `OPENAI_API_KEY` in your .env.');
  }

  return {
    issue: {
      regexOrAST: 'Regex',
      type: IssueTypes.NC,
      title: 'Typos',
      regex: /a/g,
    },
    instances,
  };
};

export default checkTypos;
