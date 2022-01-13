import {Dispatch} from '@reduxjs/toolkit';
import React from 'react';
import {Text} from 'react-native';
import {connect, useSelector} from 'react-redux';
import {tick as tick_action} from '../features/timer';
import {RootState} from '../store';

interface IProps {
  tick: (v: number) => void;
}

class InnerHiddenTimer extends React.Component<IProps> {
  loopID: number = 0;

  componentDidMount() {
    console.log('timer start.');
    this.loop(0);
  }

  loop(v: number): void {
    const {tick} = this.props;
    if (this.loopID !== 0) {
      tick(v);
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
  const {g_frame} = useSelector((state: RootState) => state.timerReducer);
  return (
    <Text>
      current frame: {g_frame}, current second: {(g_frame / 60).toFixed(2)}
    </Text>
  );
}
