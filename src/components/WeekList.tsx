import {useAtom} from 'jotai';
import React from 'react';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {DEFAULT_WEEK, withSelectedWeek} from '../states';
import {WeekButton} from '../commons';
import styled from 'styled-components/native';

const MAX_WEEK = 40;
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
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (weekButtonWidth + buttonMargin),
    );
    setSelectedWeek(newPage + 1);
  };

  const onPressWeek = (index: number) => {
    setSelectedWeek(index);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View key={index + 1}>
        <WeekButton
          onPress={() => onPressWeek(index + 1)}
          selected={selectedWeek === index + 1}
          week={index + 1}
        />
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
