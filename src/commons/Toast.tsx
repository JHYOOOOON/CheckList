import React, {useEffect} from 'react';
import Reload from '../assets/icons/reload.svg';
import styled from 'styled-components/native';
import {useSetAtom} from 'jotai';
import {withToast, withUndoTodoList} from '../states';
import * as Theme from '../theme';
import {ToastType} from '../states/types';
import Animated, {FadeInUp, FadeOutDown} from 'react-native-reanimated';
import {StyleSheet, Platform} from 'react-native';

const TIMER = 3000;

interface IToast {
  toast: ToastType;
}

export function Toast({toast}: IToast) {
  const setToast = useSetAtom(withToast);
  const undoToast = useSetAtom(withUndoTodoList);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (toast) {
      timerId = setTimeout(() => {
        setToast(null);
      }, TIMER);
    }

    return () => {
      timerId && clearTimeout(timerId);
      timerId = null;
    };
  }, [toast]);

  const undo = () => {
    undoToast(toast);
    setToast(null);
  };

  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={styles.wrapper}>
      <Content>Checklist deleted</Content>
      <UndoWrapper onPress={undo}>
        <Reload color={Theme.colors.skyblue} />
        <Undo>Undo</Undo>
      </UndoWrapper>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 0,
    marginVertical: 'auto',
    marginTop: 20,
    width: 335,
    height: 46,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: Theme.colors.black,
    ...Platform.select({
      ios: {
        shadowColor: Theme.colors.black,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
    }),
  },
});

const UndoWrapper = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Content = styled.Text`
  font-size: 13px;
  color: ${({theme}) => theme.colors.white};
`;

const Undo = styled.Text`
  margin-left: 4px;
  font-size: 13px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.skyblue};
`;
