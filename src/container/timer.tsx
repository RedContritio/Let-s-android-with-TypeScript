import React from 'react';
import {Dispatch} from '@reduxjs/toolkit';
import {Text} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {tick as tick_action} from '../features/timer';
import {RootState} from '../store';
import performanceNow from 'performance-now';

interface IProps {
  tick: (v: number) => void;
}

class InnerHiddenTimer extends React.Component<IProps> {
  loopID: number = 0;
  time_base: number = 0;

  componentDidMount() {
    console.log('timer start.');
    this.time_base = performanceNow();
    this.loop(this.time_base);
  }

  loop(v: number): void {
    const {tick} = this.props;
    if (this.loopID !== 0) {
      tick(v - this.time_base);
    }

    this.loopID = requestAnimationFrame(this.loop.bind(this));
  }

  componentWillUnmount() {
    console.log('timer stop.');
    if (this.loopID !== 0) {
      cancelAnimationFrame(this.loopID);
      this.loopID = 0;
    }
  }

  render(): React.ReactNode {
    return <></>;
  }
}

const mapDispatch2Props = (dispatch: Dispatch) => ({
  tick: (v: number) => dispatch(tick_action(v)),
});

export const HiddenTimer = connect(
  undefined,
  mapDispatch2Props,
)(InnerHiddenTimer);

export function TimerDisplay() {
  const {g_frame, g_time, g_time_delta} = useSelector(
    (state: RootState) => state.timerReducer,
  );
  return (
    <Text>
      current fps: {(1 / g_time_delta).toFixed(0)}, current seconds:{' '}
      {g_time.toFixed(2)}, total frame: {g_frame}
    </Text>
  );
}
