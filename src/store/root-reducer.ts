import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const.ts';
import {appData} from './app-data/app-data.ts';
import {appProcess} from './app-process/app-process.ts';
import {userProcess} from './user-process/user-process.ts';

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
