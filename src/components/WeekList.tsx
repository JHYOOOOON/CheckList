import {useAtom} from 'jotai';
import React from 'react';
import {View} from 'react-native';
import {withSelectedWeek} from '../states';
import {WeekButton} from '../commons';
import styled from 'styled-components/native';

const MAX_WEEK = 40;

export function WeekList() {
  const [selectedWeek, setSelectedWeek] = useAtom(withSelectedWeek);

  const onPressWeek = (index: number) => {
    setSelectedWeek(index);
  };
  return (
    <StyledWeekList horizontal={true}>
      {Array(MAX_WEEK)
        .fill(null)
        .map((_, index) => (
          <View key={index + 1}>
            <WeekButton
              onPress={() => onPressWeek(index + 1)}
              selected={selectedWeek === index + 1}
              week={index + 1}
            />
          </View>
        ))}
    </StyledWeekList>
  );
}

const StyledWeekList = styled.ScrollView`
  width: 100%;
  height: 78px;
  flex-grow: 0;
  padding-bottom: 16px;
  background-color: blue;
`;
