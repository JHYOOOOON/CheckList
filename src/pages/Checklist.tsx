import React, {useState} from 'react';
import {View} from 'react-native';

import {CheckboxItem, Progress} from '../commons';

export function Checklist(): JSX.Element {
  const [isDone, setIsDone] = useState(false);

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
    </View>
  );
}
