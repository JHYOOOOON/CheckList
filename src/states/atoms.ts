import {atom} from 'jotai';

import {ToastType, TodoListType} from './types';

const INITIAL_MODE = false;
export const DEFAULT_WEEK = 15;
const INITIAL_LIST: TodoListType = [];

export const isEditModeAtom = atom<boolean>(INITIAL_MODE);
export const selectedWeekAtom = atom<number>(DEFAULT_WEEK);
export const todoListAtom = atom<TodoListType>(INITIAL_LIST);

export const toastAtom = atom<ToastType>(null);
