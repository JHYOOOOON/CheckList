import React, {useState} from 'react';
import {View} from 'react-native';

import {CheckboxItem, Progress, WeekButton} from '../commons';

export function Checklist(): JSX.Element {
  const [isDone, setIsDone] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View>
      <Progress done={5} total={11} />
      <CheckboxItem
        value="apadsfasfdsafdsafdasfasdfhd"
        checked={isDone}
        onPress={() => {
          setIsDone(prev => !prev);
        }}
      />
      <WeekButton
        selected={isSelected}
        week={10}
        onPress={() => setIsSelected(prev => !prev)}
      />
    </View>
  );
}
