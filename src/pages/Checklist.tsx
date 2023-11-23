import React, {useEffect} from 'react';
import uuid from 'react-native-uuid';
import {useSetAtom} from 'jotai';
import {View} from 'react-native';

import {Header, WeekList, TodoList} from '../components';
import {withTodoList} from '../states';
import dummyData from '../data/data.json';

export function Checklist(): JSX.Element {
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
    <View>
      <Header />
      <WeekList />
      <TodoList />
    </View>
  );
}
