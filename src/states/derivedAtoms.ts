import {atom} from 'jotai';

import {isEditModeAtom, selectedWeekAtom} from './atoms';

export const withIsEditMode = atom(
  get => get(isEditModeAtom),
  (get, set, newMode: boolean) => set(isEditModeAtom, newMode),
);

export const withSelectedWeek = atom(
  get => get(selectedWeekAtom),
  (get, set, selectedWeek: number) => set(selectedWeekAtom, selectedWeek),
);
