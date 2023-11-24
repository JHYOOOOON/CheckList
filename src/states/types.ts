type DataItemType = {
  weekNumber: number;
  content: string;
};

export type DataType = DataItemType[];

export type TodoType = DataItemType & {
  isDone: boolean;
  id: string;
};

export type TodoListType = TodoType[];

type ToastContentType = TodoType & {
  index: number;
};

export type ToastType = ToastContentType | null;
