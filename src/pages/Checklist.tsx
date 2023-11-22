import React from 'react';
import {View} from 'react-native';

import {Progress} from '../commons';

export function Checklist(): JSX.Element {
  return (
    <View>
      <Progress done={5} total={11} />
    </View>
  );
}
