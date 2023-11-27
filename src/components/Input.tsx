import React, {useState} from 'react';
import styled, {css} from 'styled-components/native';
import ArrowUpIcon from '../assets/icons/arrowUp.svg';
import {useSetAtom} from 'jotai';
import {todoListFamily} from '../states';
import uuid from 'react-native-uuid';
import {InputAccessoryView} from 'react-native';

interface IInput {
  selectedWeek: number;
  handleMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Input({handleMode, selectedWeek}: IInput) {
  const [text, setText] = useState('');
  const addTodoList = useSetAtom(todoListFamily(selectedWeek));

  const handleCancel = () => {
    setText('');
    handleMode(false);
  };

  const handleChange = (value: string) => {
    setText(value);
  };

  const handlePressButton = () => {
    addTodoList({
      id: uuid.v4().toString(),
      content: text,
      isDone: false,
    });
    setText('');
    handleMode(false);
  };

  return (
    <Wrapper>
      <Dim onPress={handleCancel} />
      <InputAccessoryView>
        <StyledView>
          <CustomInput $disabled={text === ''}>
            <StyledText
              placeholder="Add a checklist..."
              value={text}
              onChangeText={handleChange}
              autoFocus
            />
            <Button onPress={handlePressButton} disabled={text === ''}>
              <ArrowUpIcon width={18} height={18} />
            </Button>
          </CustomInput>
        </StyledView>
      </InputAccessoryView>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
`;

const Dim = styled.Pressable`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
`;

const StyledView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 66px;
  padding: 20px 12px;
  background-color: ${({theme}) => theme.colors.white};
`;

const CustomInput = styled.View<{$disabled: boolean}>`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px 5px 5px 16px;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid rgba(234, 233, 237, 1);
  ${({$disabled}) =>
    $disabled &&
    css`
      opacity: 0.4;
    `}
`;

const StyledText = styled.TextInput`
  font-size: 14px;
  flex: 1;
`;

const Button = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 12px;
  background-color: ${({theme}) => theme.colors.skyblue};
`;
