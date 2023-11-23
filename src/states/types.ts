type DataItemType = {
  weekNumber: number;
  content: string;
};

export type DataType = DataItemType[];

export type TodoType = DataItemType & {
  isDone: boolean;
};

export type TodoListType = TodoType[];
