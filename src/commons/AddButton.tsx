import React from 'react';
import PlusIcon from '../assets/icons/plus.svg';
import styled from 'styled-components/native';

interface IAddButton {
  onPress: () => void;
}

export function AddButton({onPress}: IAddButton) {
  return (
    <Wrapper onPress={onPress}>
      <PlusIcon width={26} height={26} />
    </Wrapper>
  );
}

const Wrapper = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background-color: ${({theme}) => theme.colors.skyblue};
`;
