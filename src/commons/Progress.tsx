import React from 'react';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import styled from 'styled-components/native';
import * as Theme from '../theme';

interface IProgress {
  total: number;
  done: number;
}

export function Progress({total, done}: IProgress) {
  const percentage =
    total === 0 ? 0 : Math.round((done / total) * 100 * 100) / 100;

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: withTiming(`${percentage}%`, {duration: 1000}),
    height: '100%',
    backgroundColor: Theme.colors.skyblue,
    borderRadius: 10,
  }));

  return (
    <ProgressSection>
      <Content>
        <Description>
          {done} of {total} completed
        </Description>
        <Percent>{percentage}%</Percent>
      </Content>
      <ProgressBarWrapper>
        <Animated.View style={animatedStyle} />
      </ProgressBarWrapper>
    </ProgressSection>
  );
}

const ProgressSection = styled.View`
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin-bottom: 28px;
`;

const Content = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const Percent = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.skyblue};
  font-weight: 700;
`;

const Description = styled.Text`
  font-weight: 700;
  font-size: 16px;
`;

const ProgressBarWrapper = styled.View`
  position: relative;
  width: 100%;
  height: 6px;
  background-color: ${({theme}) => theme.colors.gray500};
  border-radius: 10px;
`;
