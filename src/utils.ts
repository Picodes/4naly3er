import { InputType, Instance } from './types';

export const lineFromIndex = (file: string, index: number) => {
  return 1 + [...file?.slice(0, index).matchAll(/\n/g)!].length;
};

export const instanceFromSRC = (file: InputType[0], src: string): Instance => {
  return {
    fileName: file.name,
    fileContent: file.content,
    line: lineFromIndex(file.content, parseInt(src.split(':')[0])),
  };
};
