import React from 'react';
import {View} from 'react-native';
import {Header} from '../components';
import {WeekList} from './WeekList';

export function Checklist(): JSX.Element {
  return (
    <View>
      <Header />
      <WeekList />
    </View>
  );
}
