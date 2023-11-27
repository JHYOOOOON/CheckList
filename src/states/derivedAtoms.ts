import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';

import {
  isEditModeAtom,
  selectedWeekAtom,
  toastAtom,
  todoListAtom,
} from './atoms';
import {ToastType, TodoListType, TodoType} from './types';

export const withIsEditMode = atom(
  get => get(isEditModeAtom),
  (get, set, newMode: boolean) => set(isEditModeAtom, newMode),
);

export const withSelectedWeek = atom(
  get => get(selectedWeekAtom),
  (get, set, selectedWeek: number) => set(selectedWeekAtom, selectedWeek),
);

export const withTodoList = atom(
  get => get(todoListAtom),
  (get, set, newTodoList: TodoListType) => set(todoListAtom, newTodoList),
);

export const todoListFamily = atomFamily((week: number) =>
  atom(
    get => {
      const todoList = get(todoListAtom);
      return todoList.filter(item => item.weekNumber === week);
    },
    (get, set, data: Omit<TodoType, 'weekNumber'>) => {
      const prevTodoList = [...get(todoListAtom)];
      const targetIndex = prevTodoList.findIndex(item => item.id === data.id);
      const isExist = targetIndex !== -1;

      if (isExist) {
        prevTodoList[targetIndex] = {weekNumber: week, ...data};
        set(todoListAtom, prevTodoList);
        return;
      }
      set(todoListAtom, [{weekNumber: week, ...data}, ...prevTodoList]);
    },
  ),
);

export const deleteTodoListFamily = atomFamily((week: number) =>
  atom(null, (get, set, id: string) => {
    const prevTodoList = [...get(todoListAtom)];
    const targetIndex = prevTodoList.findIndex(
      item => item.id === id && week === item.weekNumber,
    );

    if (targetIndex === -1) {
      return;
    }
    set(todoListAtom, [
      ...prevTodoList.slice(0, targetIndex),
      ...prevTodoList.slice(targetIndex + 1),
    ]);
  }),
);

export const withToast = atom(
  get => get(toastAtom),
  (get, set, data: ToastType) => set(toastAtom, data),
);

export const withUndoTodoList = atom(null, (get, set, data: ToastType) => {
  if (data === null) {
    return;
  }
  const prevTodoList = [...get(todoListAtom)];
  set(todoListAtom, [
    ...prevTodoList.slice(0, data.index),
    {
      weekNumber: data.weekNumber,
      isDone: data.isDone,
      id: data.id,
      content: data.content,
    },
    ...prevTodoList.slice(data.index),
  ]);
});
