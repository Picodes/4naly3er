import fs from 'fs';
import path from 'path';
import semver from 'semver';
import type { SourceUnit } from 'solidity-ast';

const versions = Object.keys(require('../package.json').dependencies)
  .filter(s => s.startsWith('solc-'))
  .map(s => s.replace('solc-', ''))
  .sort(semver.compare)
  .reverse();

const latest = versions[versions.length - 1];

type ToCompile = { [file: string]: { content: string } };
type Sources = { file: string; index: number; content: string; version: string; compiled: boolean; ast?: SourceUnit }[];

const compile = async (version: string, toCompile: ToCompile) => {
  const solc = require(`solc-${version}`);

  // version() returns something like '0.8.13+commit.abaa5c0e.Emscripten.clang'
  const [trueVersion] = solc.version().split('+');

  let output;

  if (trueVersion !== version) {
    output = {
      errors: [{ formattedMessage: `Package solc-${version} is actually solc@${trueVersion}` }],
    };
  } else {
    output = JSON.parse(
      solc.compile(
        JSON.stringify({
          sources: toCompile,
          language: 'Solidity',
          settings: {
            outputSelection: { '*': { '': ['ast'] } },
          },
        }),
      ),
    );
  }

  return output;
};

const compileAndBuildAST = async (basePath: string, fileNames: string[]): Promise<SourceUnit[]> => {
  let sources: Sources = [];

  // Read scope and fill file list
  let i = 0;
  for (const file of fileNames) {
    const content = await fs.readFileSync(path.join(basePath, file), { encoding: 'utf8', flag: 'r' });
    if (!!content) {
      sources.push({
        file: path.join(basePath, file),
        index: i++,
        content,
        version: content.match(/pragma solidity (.*);/)![1],
        compiled: false,
      });
    }
  }

  const promises: Promise<void>[] = [];
  for (const version of versions) {
    const filteredSources = sources.filter(f => semver.satisfies(version, f.version) && !f.compiled);
    // Mark the filteredSources as being sent to compilation
    for (const f of filteredSources) {
      sources[f.index].compiled = true;
    }

    if (filteredSources.length > 0) {
      promises.push(
        compile(
          version,
          filteredSources.reduce((res: ToCompile, curr) => {
            res[curr.file] = { content: curr.content };
            return res;
          }, {}),
        ).then(output => {
          for (const f of filteredSources) {
            sources[f.index].ast = output.sources[f.file]?.ast;
          }
        }),
      );
    }
  }
  await Promise.all(promises);
  return sources.map(f => f.ast!);
};

export default compileAndBuildAST;
