import {atom} from 'jotai';

import {TodoListType} from './types';

const INITIAL_MODE = false;
const DEFAULT_WEEK = 15;
const INITIAL_LIST: TodoListType = [];

export const isEditModeAtom = atom<boolean>(INITIAL_MODE);
export const selectedWeekAtom = atom<number>(DEFAULT_WEEK);
export const todoListAtom = atom<TodoListType>(INITIAL_LIST);
