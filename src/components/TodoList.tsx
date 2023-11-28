import React from 'react';
import {CheckboxItem, Progress} from '../commons';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import {
  deleteTodoListFamily,
  todoListFamily,
  withIsEditMode,
  withSelectedWeek,
  withToast,
  withTodoList,
} from '../states';
import styled from 'styled-components/native';
import NoteImage from '../assets/images/note.svg';

export function TodoList() {
  const setToast = useSetAtom(withToast);
  const selectedWeek = useAtomValue(withSelectedWeek);
  const [todoList, setTodoList] = useAtom(todoListFamily(selectedWeek));
  const totalTodoList = useAtomValue(withTodoList);
  const hasTodoList = todoList.length > 0;
  const deleteTodoList = useSetAtom(deleteTodoListFamily(selectedWeek));
  const isEditMode = useAtomValue(withIsEditMode);

  const onPress = (id: string) => {
    const targetIndex = todoList.findIndex(todo => todo.id === id);
    setTodoList({
      id,
      content: todoList[targetIndex].content,
      isDone: !todoList[targetIndex].isDone,
    });
  };

  const onDelete = (id: string) => {
    const targetIndex = totalTodoList.findIndex(todo => todo.id === id);
    deleteTodoList(id);
    setToast({
      index: targetIndex,
      ...totalTodoList[targetIndex],
    });
  };

  return (
    <>
      {hasTodoList ? (
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
                onPress={() => onPress(todo.id)}
                onDelete={() => onDelete(todo.id)}
                isEditMode={isEditMode}
              />
            ))}
          </TodoListWrapper>
        </StyledView>
      ) : (
        <EmptyWrapper>
          <NoteImage width={165} height={140} />
          <TextWrapper>
            <Title>No Checklists</Title>
            <Description>
              Add checklists that should be checked weekly.
            </Description>
          </TextWrapper>
        </EmptyWrapper>
      )}
    </>
  );
}

const StyledView = styled.View`
  flex: 1;
  padding: 28px 20px 0 20px;
  border-top-width: 1px;
  border-color: ${({theme}) => theme.colors.gray500};
`;

const TodoListWrapper = styled.ScrollView`
  display: flex;
  flex-direction: column;
`;

const EmptyWrapper = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 99px;
  border-top-width: 1px;
  border-color: ${({theme}) => theme.colors.gray500};
`;

const TextWrapper = styled.View`
  display: flex;
  align-items: center;
  margin-top: 28px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.gray};
`;

const Description = styled.Text`
  margin-top: 8px;
  font-size: 13px;
  color: ${({theme}) => theme.colors.gray100};
`;
