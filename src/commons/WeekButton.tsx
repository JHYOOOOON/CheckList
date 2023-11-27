import React from 'react';
import styled from 'styled-components/native';
import {weekButtonWidth} from '../components';

interface IWeekButton {
  onPress: () => void;
  selected: boolean;
  week: number;
}

export function WeekButton({onPress, selected, week}: IWeekButton) {
  return (
    <Button onPress={onPress} $selected={selected}>
      <Week $selected={selected}>week</Week>
      <WeekNum $selected={selected}>{week}</WeekNum>
    </Button>
  );
}

const Button = styled.Pressable<{$selected: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 62px;
  /* Notice: 피그마에서 radius 값이 보이지 않아 임의 지정 */
  border-radius: 100px;
  background-color: ${({$selected, theme}) =>
    $selected ? theme.colors.skyblue : theme.colors.gray500};
`;

const Week = styled.Text<{$selected: boolean}>`
  font-size: 11px;
  color: ${({$selected, theme}) =>
    $selected ? theme.colors.white : theme.colors.gray100};
`;

const WeekNum = styled.Text<{$selected: boolean}>`
  font-size: 18px;
  font-weight: 700;
  color: ${({$selected, theme}) =>
    $selected ? theme.colors.white : theme.colors.gray100};
`;
