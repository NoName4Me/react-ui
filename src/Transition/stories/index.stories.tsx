import React, { useState } from 'react';
import Transition, { Fade, Scale } from '../index';
import Button from '../../Button';

export default {
  title: 'Story|Transition',
};

const style = { display: 'inline-block', padding: '4px', backgroundColor: 'pink' };

export const fade = () => {
  const [show, setShow] = useState(false);
  const duration = 400;
  return (
    <div>
      <Button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</Button>
      <Fade show={show} duration={duration}>
        <span style={style}>Fade In Out: {duration}ms</span>
      </Fade>
    </div>
  );
};

fade.story = {
  name: '淡入淡出',
};

export const scale = () => {
  const [show, setShow] = useState(false);
  const duration = 300;
  return (
    <div>
      <Button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</Button>
      <Scale show={show} duration={duration}>
        <span style={style}>Zoom In Out: {duration}ms</span>
      </Scale>
    </div>
  );
};

scale.story = {
  name: '缩放出入',
};

function getStyle(state) {
  const style = {
    opacity: 1,
    transform: 'scaleY(1)',
  };
  if (state !== 'entered') {
    style.opacity = 0;
    style.transform = 'scaleY(0)';
  }
  return style;
}
export const custom = () => {
  const [show, setShow] = useState(false);
  const duration = 200;
  return (
    <div>
      <Button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</Button>
      <Transition show={show} duration={duration} getTransitionStyle={getStyle}>
        <span style={style}>ScaleY and Fade: {duration}ms</span>
      </Transition>
    </div>
  );
};

scale.custom = {
  name: '缩放出入',
};
