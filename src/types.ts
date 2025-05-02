import { SourceUnit } from 'solidity-ast';

export enum IssueTypes {
  GAS = 'GAS',
  NC = 'NC',
  L = 'L',
  M = 'M',
  H = 'H',
}

export enum ReportTypes {
  markdown = 'markdown'
}

// List of solidity files with content and name
export type InputType = { content: string; name: string; ast: SourceUnit }[];

// Single Instance of a given issue
export type Instance = {
  fileName: string; // Name of the file in which the issue has been found
  fileContent: string; // Content of the file in which the issue has been found
  line: number;
  endLine?: number;
};

export type Issue = RegexIssue | ASTIssue;

// Type to follow to add an issue detected by a regex
export type RegexIssue = {
  id: string;
  type: IssueTypes;
  title: string;
  regex: RegExp;
  regexPreCondition?: RegExp;
  impact?: string;
  description?: string;
  startLineModifier?: number; // To build the code snipped from the index of the regex
  endLineModifier?: number;
  regexOrAST: 'Regex';
};

// Type to follow to add an issue detected by AST analysis
export type ASTIssue = {
  id: string;
  type: IssueTypes;
  title: string;
  impact?: string;
  description?: string;
  detector: (files: InputType) => Instance[]; // Function analyzing the AST and returning instances of the issue
  regexOrAST: 'AST';
};

// Type to bundle Issues and Instances for splitting Analysis and Printing steps
export type Analysis = {
  issue: Issue;
  instances: Instance[];
};

export type AnalysisResults = {
  GAS?: Analysis[];
  NC?: Analysis[];
  L?: Analysis[];
  M?: Analysis[];
  H?: Analysis[];
}

export type SARIFResult = {
  ruleId: string;
  message: {
    text: string;
  };
  locations: Location[];
  level: string;
};

export type Location = {
  physicalLocation: {
    artifactLocation: {
      uri: string;
    };
    region: {
      startLine: number;
      startColumn: number;
      endLine?: number;
    };
  };
};