import React, {useEffect} from 'react';
import uuid from 'react-native-uuid';
import {useAtomValue, useSetAtom} from 'jotai';

import {Header, WeekList, TodoList} from '../components';
import {withToast, withTodoList} from '../states';
import dummyData from '../data/data.json';
import {Toast} from '../commons/Toast';
import styled from 'styled-components/native';

export function Checklist(): JSX.Element {
  const toast = useAtomValue(withToast);
  const setTodoList = useSetAtom(withTodoList);

  useEffect(() => {
    setTodoList(
      dummyData.map(item => ({
        ...item,
        isDone: false,
        id: uuid.v4() as string,
      })),
    );
  }, []);

  return (
    <Wrapper>
      <Header />
      <WeekList />
      <TodoList />
      <Bottom>{toast && <Toast toast={toast} />}</Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  position: relative;
  background-color: burlywood;
  width: 100%;
  height: 100%;
`;

const Bottom = styled.View`
  position: absolute;
  width: 100%;
  height: 118px;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 20px;
`;
