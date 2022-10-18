import { InputFiles } from 'typescript';
import { InputType, Instance } from './issues';

export const oneLineBelowRegexDetector = (regex: RegExp) => {
  return (files: InputType) => {
    const instances: Instance[] = [];
    for (const file of files) {
      for (const res of file.content.matchAll(regex)) {
        // `res.index` is one line above the issue
        const line = 2 + [...res.input?.slice(0, res.index).matchAll(/\n/g)!].length;
        instances.push({ fileName: file.name, line, fileContent: res.input! });
      }
    }

    return instances;
  };
};
