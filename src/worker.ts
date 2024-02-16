const Queue = require('bull');
const path = require('node:path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { rimrafSync } from 'rimraf';
import { gitUrlToSsh } from './utils';
import { simpleGit } from 'simple-git';
import main from './main';
import { Job } from 'bull';

const REDIS_URL = 'redis://localhost:6379';
const QUEUE_NAME = '4naly3er_analyze';
const RETURN_QUEUE_NAME = 'auditor_platform:auto_analyze';

interface IAutoAnalyzeJobData {
  id: string;
  github: string;
  report?: string;
}

const queue = new Queue(QUEUE_NAME, { redis: REDIS_URL });
const returnQueue = new Queue(RETURN_QUEUE_NAME, { redis: REDIS_URL });

queue.process(async (job: Job<IAutoAnalyzeJobData>) => {
  const data = job.data;

  const [gitSsh, gitUser, gitProject] = gitUrlToSsh(data.github);
  const projectPath = path.join(__dirname, 'github-projects', gitUser, gitProject);

  try {
    await simpleGit().clone(gitSsh, projectPath);
    console.log('Repository cloned successfully!');
  } catch (error) {
    console.error('Error cloning repository:', error);
    return;
  }

  const npmInstallCommand = 'npm install';
  try {
    const { stdout, stderr } = await exec(npmInstallCommand, { cwd: projectPath });
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    return;
  }
  const result = await main(projectPath, ``, data.github);

  rimrafSync(projectPath);
  console.log('Remove project folder successfully');

  returnQueue.add('auditor_platform:auto_analyze::HandleSaveAnalyzeJob', { id: data.id, result });
});

queue.on('completed', (job: any) => {
  console.log('Job completed:', job.id);
});

queue.on('error', (error: any) => {
  console.error('Error processing job:', error);
});

console.log(`Worker listening to queue "${QUEUE_NAME}" on Redis...`);
