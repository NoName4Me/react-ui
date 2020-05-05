import React from 'react';
import './index.scss';
import { TransitionStatus } from 'react-transition-group/Transition';
import CustomTransition, { TransitionProps, transitionPropTypes } from './CustomTransition';

function getFadeStyles(state: TransitionStatus) {
  const style = {
    transform: 'scale(1)',
  };
  if (state !== 'entered') {
    style.transform = 'scale(0)';
  }
  return style;
}

interface ScaleProps extends TransitionProps {}

function Scale(props: ScaleProps) {
  return <CustomTransition {...props} getTransitionStyle={getFadeStyles} />;
}

Scale.propTypes = {
  ...transitionPropTypes,
};

export default Scale;
