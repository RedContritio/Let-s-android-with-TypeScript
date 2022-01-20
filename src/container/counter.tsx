import React from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {increment} from '../features';
import {RootState} from '../store';

export function CounterDisplay() {
  const {g_value} = useSelector((state: RootState) => state.counterReducer);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>counter value: {g_value}</Text>
      <Button title="+1" onPress={() => dispatch(increment())} />
    </View>
  );
}
