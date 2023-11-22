import React from 'react';
import styled from 'styled-components/native';
import {useAtom} from 'jotai';
import {Text} from 'react-native';
import {withIsEditMode} from '../states';

export function Header() {
  const [isEditMode, setIsEditMode] = useAtom(withIsEditMode);

  const startEditMode = () => setIsEditMode(true);

  const endEditMode = () => setIsEditMode(false);

  return (
    <StyledHeader>
      <Title>Checklists</Title>
      {isEditMode ? (
        <ChangeModeButton onPress={endEditMode}>
          <Text>Done</Text>
        </ChangeModeButton>
      ) : (
        <ChangeModeButton onPress={startEditMode}>
          <Text>Edit</Text>
        </ChangeModeButton>
      )}
    </StyledHeader>
  );
}

const StyledHeader = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
`;

const ChangeModeButton = styled.Pressable`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 15px;
  line-height: 23px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
`;
