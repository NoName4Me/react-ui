import React from 'react';
import './index.scss';
import { TransitionStatus } from 'react-transition-group/Transition';
import CustomTransition, { TransitionProps, transitionPropTypes } from './CustomTransition';

function getFadeStyles(state: TransitionStatus) {
  const style = {
    opacity: 1,
  };
  if (state !== 'entered') {
    style.opacity = 0;
  }
  return style;
}

interface FadeProps extends TransitionProps{}

function Fade(props: FadeProps) {
  return <CustomTransition {...props} getTransitionStyle={getFadeStyles}/>;
}

Fade.propTypes = {
  ...transitionPropTypes,
};

Fade.defaultProps = {
  ...CustomTransition.defaultProps,
};

export default Fade;
