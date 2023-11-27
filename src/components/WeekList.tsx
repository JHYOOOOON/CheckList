import React from 'react';
import {useAtom} from 'jotai';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {DEFAULT_WEEK, withSelectedWeek} from '../states';
import {WeekButton} from '../commons';
import {MAX_WEEK} from '../constants';

export const weekButtonWidth = 50;
const buttonMargin = 15;
const windowWidth = Dimensions.get('window').width;
const carouselPadding = (windowWidth - weekButtonWidth) / 2;

export function WeekList() {
  const [selectedWeek, setSelectedWeek] = useAtom(withSelectedWeek);
  const carouselItems = Array(MAX_WEEK).fill(null);
  const scrollOffset = carouselItems.map(
    (item, index) => index * (weekButtonWidth + buttonMargin),
  );

  const onScroll = (e: any) => {
    const nextWeek = Math.round(
      e.nativeEvent.contentOffset.x / (weekButtonWidth + buttonMargin),
    );
    if (nextWeek < 0 || nextWeek >= MAX_WEEK) {
      return;
    }
    setSelectedWeek(nextWeek + 1);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View key={index + 1}>
        <WeekButton selected={selectedWeek === index + 1} week={index + 1} />
      </View>
    );
  };

  return (
    <StyledWeekList>
      <FlatList
        data={carouselItems}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        snapToOffsets={scrollOffset}
        onScroll={onScroll}
        contentContainerStyle={FlatStyle.container}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        initialScrollIndex={DEFAULT_WEEK}
      />
    </StyledWeekList>
  );
}

const StyledWeekList = styled.View`
  flex-direction: row;
`;

const FlatStyle = StyleSheet.create({
  container: {
    paddingHorizontal: carouselPadding,
    paddingBottom: 15,
  },
});
