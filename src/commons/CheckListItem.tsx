import React from 'react';
import styled, {css} from 'styled-components/native';
import * as Theme from '../theme';
import MinusIcon from '../assets/icons/minus.svg';
import CheckIcon from '../assets/icons/check.svg';

type CheckboxItemType = {
  value: string;
  checked: boolean;
  isEditMode: boolean;
  onPress: () => void;
  onDelete: () => void;
};

export function CheckboxItem({
  checked,
  onPress,
  value,
  onDelete,
  isEditMode = false,
}: CheckboxItemType) {
  return (
    <Wrapper disabled={isEditMode} onPress={onPress} data-content={value}>
      {isEditMode === false && (
        <Checkbox $isChecked={checked}>
          <CheckIcon
            width={16}
            height={16}
            color={checked ? Theme.colors.white : Theme.colors.gray200}
          />
        </Checkbox>
      )}
      <Value $isChecked={checked}>{value}</Value>
      {isEditMode && (
        <DeleteButton onPress={onDelete}>
          <MinusIcon width={18} height={18} color={Theme.colors.white} />
        </DeleteButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.Pressable`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 0;
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

const DeleteButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: ${({theme}) => theme.colors.red};
`;

const Value = styled.Text<{$isChecked: boolean}>`
  flex: 1;
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
