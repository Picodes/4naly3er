import { InputType, Instance } from './types';
import fs from 'fs';

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
  end && console.log(start, end);
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
 * @notice Extract only top levels files
 * @dev :(file not included in an other contract in the code base)
 */
export const detector = (files: InputType): InputType => {
  return null;
};
