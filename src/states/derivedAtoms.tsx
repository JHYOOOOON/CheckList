import {atom} from 'jotai';

import {isEditModeAtom} from './atoms';

export const withIsEditMode = atom(
  get => get(isEditModeAtom),
  (get, set, newMode: boolean) => set(isEditModeAtom, newMode),
);
