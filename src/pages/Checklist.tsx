import React, {useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import {useAtomValue, useSetAtom} from 'jotai';

import {Header, WeekList, TodoList, Input} from '../components';
import {
  withIsEditMode,
  withSelectedWeek,
  withToast,
  withTodoList,
} from '../states';
import dummyData from '../data/data.json';
import {Toast} from '../commons/Toast';
import styled from 'styled-components/native';
import {AddButton} from '../commons/AddButton';
import {Dimensions} from 'react-native';

export function Checklist(): JSX.Element {
  const toast = useAtomValue(withToast);
  const setTodoList = useSetAtom(withTodoList);
  const isEditMode = useAtomValue(withIsEditMode);
  const [isAddMode, setIsAddMode] = useState(false);
  const selectedWeek = useAtomValue(withSelectedWeek);

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
      {isAddMode && (
        <Input handleMode={setIsAddMode} selectedWeek={selectedWeek} />
      )}
      <Header />
      <WeekList />
      <TodoList />
      <Bottom>
        {isEditMode === false && isAddMode === false && (
          <ButtonWrapper>
            <AddButton onPress={() => setIsAddMode(true)} />
          </ButtonWrapper>
        )}
        {toast && <Toast toast={toast} />}
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  position: relative;
  width: 100%;
  height: ${Dimensions.get('window').height}px;
  flex: 1;
`;

const Bottom = styled.View`
  position: absolute;
  width: 100%;
  height: 162px;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 44px;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 20px;
`;
