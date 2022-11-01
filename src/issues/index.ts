import { Issue } from '../types';
import avoidEncodePacked from './L/avoidEncodePacked';
import boolIncursOverhead from './GAS/boolIncursOverhead';
import cacheArrayLength from './GAS/cacheArrayLength';
import calldataViewFunctions from './GAS/calldataViewFunctions';
import customErrors from './GAS/customErrors';
import delegateCallInLoop from './H/delegateCallInLoop';
import deprecatedFunctions from './L/deprecatedFunctions';
import initializeDefaultValue from './GAS/initializeDefaultValue';
import longRevertString from './GAS/longRevertString';
import nonReentrantBeforeModifiers from './NC/nonReentrantBeforeModifiers';
import postIncrement from './GAS/postIncrement';
import privateForConstants from './GAS/privateForConstants';
import returnValueOfApprove from './NC/returnValueOfApprove';
import shiftInsteadOfDiv from './GAS/shiftInsteadOfDiv';
import unsafeERC20Operations from './L/unsafeERC20Operations';
import unsignedComparison from './GAS/unsignedComparison';
import unspecifiedPragma from './L/unspecifiedPragma';
import useConstants from './NC/useConstants';
import addressBalance from './GAS/addressBalance';
import addressZero from './GAS/addressZero';
import assignUpdateArray from './GAS/assignUpdateArray';

const issues: Issue[] = [
  addressBalance,
  addressZero,
  cacheArrayLength,
  assignUpdateArray,
  unsignedComparison,
  initializeDefaultValue,
  shiftInsteadOfDiv,
  longRevertString,
  boolIncursOverhead,
  calldataViewFunctions,
  customErrors,
  postIncrement,
  privateForConstants,
  returnValueOfApprove,
  nonReentrantBeforeModifiers,
  useConstants,
  unsafeERC20Operations,
  unspecifiedPragma,
  deprecatedFunctions,
  avoidEncodePacked,
  delegateCallInLoop,
];

export default issues;
