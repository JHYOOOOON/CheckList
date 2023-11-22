import React from 'react';
import styled, {css} from 'styled-components/native';
import * as Theme from '../theme';
import CheckIcon from '../assets/icons/check.svg';

type CheckboxItemType = {
  value: string;
  checked: boolean;
  onPress: () => void;
};

export function CheckboxItem({checked, onPress, value}: CheckboxItemType) {
  return (
    <Wrapper onPress={onPress}>
      <Checkbox $isChecked={checked}>
        <CheckIcon
          width={16}
          height={16}
          color={checked ? Theme.colors.white : Theme.colors.gray200}
        />
      </Checkbox>
      <Value $isChecked={checked}>{value}</Value>
    </Wrapper>
  );
}

const Wrapper = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
`;

const Checkbox = styled.View<{$isChecked: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({$isChecked, theme}) =>
    $isChecked ? theme.colors.skyblue : theme.colors.gray400};
`;

const Value = styled.Text<{$isChecked: boolean}>`
  font-size: 14px;
  line-height: 21px;
  ${({theme, $isChecked}) => {
    if ($isChecked) {
      return css`
        color: ${theme.colors.gray200};
        text-decoration: line-through;
        text-decoration-color: ${theme.colors.gray200};
      `;
    }
  }}
`;
