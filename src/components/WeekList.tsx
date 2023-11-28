import React, {useEffect, useRef} from 'react';
import {useAtom} from 'jotai';
import {Dimensions, FlatList, StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {DEFAULT_WEEK, withSelectedWeek} from '../states';
import {WeekButton} from '../commons';
import {MAX_WEEK} from '../constants';

export const WEEK_BUTTON_WIDTH = 50;
const BUTTON_GAP = 15;
const WINDOW_WIDTH = Dimensions.get('window').width;
const CAROUSEL_PADDING = (WINDOW_WIDTH - WEEK_BUTTON_WIDTH) / 2;
const TIMER = 500;

export function WeekList() {
  const [selectedWeek, setSelectedWeek] = useAtom(withSelectedWeek);
  const carouselItems = Array(MAX_WEEK).fill(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({
        offset: (WEEK_BUTTON_WIDTH + BUTTON_GAP) * (DEFAULT_WEEK - 1),
        animated: true,
      });
    }, TIMER);
  }, []);

  const onScroll = (e: any) => {
    const nextWeek =
      Math.round(
        e.nativeEvent.contentOffset.x / (WEEK_BUTTON_WIDTH + BUTTON_GAP),
      ) + 1;
    if (nextWeek <= 0 || nextWeek > MAX_WEEK) {
      return;
    }
    setSelectedWeek(nextWeek);
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
        automaticallyAdjustContentInsets={false}
        data={carouselItems}
        decelerationRate="fast"
        snapToAlignment="start"
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        snapToInterval={WEEK_BUTTON_WIDTH + BUTTON_GAP}
        onScroll={onScroll}
        contentContainerStyle={FlatStyle.container}
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        ref={flatListRef}
      />
    </StyledWeekList>
  );
}

const StyledWeekList = styled.View`
  flex-direction: row;
`;

const FlatStyle = StyleSheet.create({
  container: {
    paddingHorizontal: CAROUSEL_PADDING,
    paddingBottom: 15,
  },
});
