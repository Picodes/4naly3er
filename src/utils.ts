import { InputType, Instance } from './types';
import fs from 'fs';
import { findAll } from 'solidity-ast/utils';

/***
 * @notice Returns the line corresponding to a character index in a file
 */
export const lineFromIndex = (file: string, index: number) => {
  return 1 + [...file?.slice(0, index).matchAll(/\n/g)!].length;
};

/***
 * @notice Builds an instance for the report from a file and a src
 * @param src Must be in format xx:xx:xx
 */
export const instanceFromSRC = (file: InputType[0], start: string, end?: string): Instance => {
  return {
    fileName: file.name,
    fileContent: file.content,
    line: lineFromIndex(file.content, parseInt(start.split(':')[0])),
    endLine: !!end ? lineFromIndex(file.content, parseInt(end.split(':')[0])) : undefined,
  };
};

/***
 * @notice Returns all file contained in a folder
 * @dev Works with a queue, could be done with a recursive function
 */
export const recursiveExploration = (basePath: string, extension = '.sol'): string[] => {
  let fileNames = [];
  let directoryQueue = [''];
  while (directoryQueue.length > 0) {
    let dir = directoryQueue.pop();
    let tempFileNames = fs.readdirSync(`${basePath}${dir}`);
    for (let fileName of tempFileNames) {
      fileName = `${dir}${fileName}`;
      if (fileName.endsWith(extension)) {
        fileNames.push(fileName);
      } else if (fs.statSync(`${basePath}${fileName}`).isDirectory()) {
        directoryQueue.push(fileName + '/');
      }
    }
  }
  return fileNames;
};

/***
 * @notice Extract files extending a given contract
 */
export const topLevelFiles = (contractId: number, files: InputType): InputType => {
  const res: InputType = [];
  for (const file of files) {
    if (!!file.ast) {
      for (const contract of findAll('ContractDefinition', file.ast)) {
        if (
          contract.contractKind === 'contract' &&
          contract.linearizedBaseContracts.includes(contractId) &&
          contract.id !== contractId
        ) {
          if (!res.includes(file)) {
            res.push(file);
            continue;
          }
        }
      }
    }
  }
  return res;
};
