import {atom} from 'jotai';

const INITIAL_MODE = false;
const DEFAULT_WEEK = 15;

export const isEditModeAtom = atom<boolean>(INITIAL_MODE);
export const selectedWeekAtom = atom<number>(DEFAULT_WEEK);
