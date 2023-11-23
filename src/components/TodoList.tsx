import React from 'react';
import {View} from 'react-native';
import {CheckboxItem, Progress} from '../commons';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import {
  deleteTodoListFamily,
  todoListFamily,
  withIsEditMode,
  withSelectedWeek,
} from '../states';
import styled from 'styled-components/native';

export function TodoList() {
  const selectedWeek = useAtomValue(withSelectedWeek);
  const [todoList, setTodoList] = useAtom(todoListFamily(selectedWeek));
  const deleteTodoList = useSetAtom(deleteTodoListFamily(selectedWeek));
  const isEditMode = useAtomValue(withIsEditMode);

  const onPress = (index: number) => {
    setTodoList({
      content: todoList[index].content,
      isDone: !todoList[index].isDone,
    });
  };

  const onDelete = (index: number) => {
    deleteTodoList(todoList[index].content);
  };

  return (
    <StyledView>
      <Progress
        total={todoList.length}
        done={todoList.filter(todo => todo.isDone).length}
      />
      <TodoListWrapper>
        {todoList.map((todo, index) => (
          <CheckboxItem
            key={`${todo.content}_${index}`}
            value={todo.content}
            checked={todo.isDone}
            onPress={() => onPress(index)}
            onDelete={() => onDelete(index)}
            isEditMode={isEditMode}
          />
        ))}
      </TodoListWrapper>
    </StyledView>
  );
}

const StyledView = styled.View`
  padding: 28px 20px 0 20px;
  border-top-width: 1px;
  border-color: ${({theme}) => theme.colors.gray500};
`;

const TodoListWrapper = styled.View`
  display: flex;
  gap: 20px;
  padding-top: 36px;
`;
