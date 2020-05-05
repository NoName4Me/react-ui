import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { StringKeyObject, NOOP } from '../common';
import './index.scss';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

export interface TransitionProps {
  show: boolean;
  duration: number;
  children: ReactElement;
}

interface CustomTransitionProps extends TransitionProps {
  getTransitionStyle: (state: TransitionStatus) => StringKeyObject<any>;
}

function CustomTransition(props: CustomTransitionProps) {
  const { getTransitionStyle, duration, show, children, ...rest } = props;
  const originalStyle = children.props.style || {};
  return (
    <Transition
      timeout={{
        enter: duration,
        exit: duration,
      }}
      in={show}
      unmountOnExit
      appear
      {...rest}
    >
      {(state) => {
        return React.cloneElement(children as ReactElement, {
          style: {
            ...getTransitionStyle(state),
            transition: `all ${duration}ms ease-in-out`,
            ...originalStyle,
          },
        });
      }}
    </Transition>
  );
}

export const transitionPropTypes = {
  /** 控制显示隐藏 */
  show: PropTypes.bool.isRequired,
  /** 过渡持续时间(ms) */
  duration: PropTypes.number,
  /** 过渡子元素 */
  children: PropTypes.element.isRequired,
};

CustomTransition.propTypes = {
  ...transitionPropTypes,
  /** 根据 TransitionStatus 设置过渡动画样式 */
  getTransitionStyle: PropTypes.func,
};

CustomTransition.defaultProps = {
  duration: 200,
  getTransitionStyle: NOOP,
};

export default CustomTransition;
