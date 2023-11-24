import React, {useEffect} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {useAtom, useAtomValue} from 'jotai';
import {withIsEditMode, withSelectedWeek} from '../states';

export function Header() {
  const [isEditMode, setIsEditMode] = useAtom(withIsEditMode);
  const selectedWeek = useAtomValue(withSelectedWeek);

  useEffect(() => {
    if (isEditMode) {
      setIsEditMode(false);
    }
  }, [selectedWeek]);

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
  background-color: red;
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
