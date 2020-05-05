import React, { useEffect, useReducer, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Transition, TransitionGroup } from 'react-transition-group';
import Notification from './Notification';
import { bem } from '../utils';
import './index.scss';
import { BaseProps, baseDefaultProps } from '../common';
import clsx from 'clsx';
import { ActionProps, Action, Placement, NoticeFullProps } from './NotificationContainer';
import { TransitionStatus } from 'react-transition-group/Transition';

const opacityMaxHeightStyles = {
  entering: { opacity: '1' },
  entered: { opacity: '1' },
  exiting: { opacity: '0.5', maxHeight: '0', overflow: 'hidden' }, //
  exited: { opacity: '0.5' },
};

function getAnimateStyle(state: TransitionStatus, placement: string) {
  const opacityMaxHeightStyle = opacityMaxHeightStyles[state as keyof typeof opacityMaxHeightStyles];
  let transform = '';
  if (state === 'entering') {
    const pos = placement.split('-');
    const relevantPlacement = pos[0] === 'center' ? pos[1] : pos[0];
    const translateMap = {
      right: 'translate3d(120%, 0, 0)',
      left: 'translate3d(-120%, 0, 0)',
      bottom: 'translateX(-50%) scale(0)',
      top: 'translateX(-50%) scale(0)',
    };
    transform = translateMap[relevantPlacement as keyof typeof translateMap];
  }
  return {
    transform,
    ...opacityMaxHeightStyle,
  };
}
interface NotificationGroupProps extends BaseProps {
  placement: string;
  notices: NoticeFullProps[];
  dispatch: React.Dispatch<ActionProps>;
}
const animateDuration = 200;
function NotificationGroup({ placement, notices, dispatch, clsPrefix }: NotificationGroupProps) {
  const handleRemove = useMemo(
    () => (id: string) => {
      dispatch({ type: Action.Remove, payload: { placement, id } });
    },
    [placement],
  );
  const cmpCls = `${clsPrefix}-NotificationGroup`;

  return (
    <TransitionGroup appear className={clsx(cmpCls, bem(cmpCls, '', placement))}>
      {notices.map(({ id, ...rest }) => {
        return (
          <Transition
            timeout={{ enter: animateDuration, exit: animateDuration * 2 }}
            key={id}
            mountOnEnter
            unmountOnExit
          >
            {(animateState) => (
              <Notification
                {...rest}
                id={id}
                style={{
                  transition: `transform ${animateDuration}ms ease, opacity ${
                    animateDuration * 2
                  }ms linear, max-height ${animateDuration * 2}ms linear`,
                  ...getAnimateStyle(animateState, placement),
                }}
                onRemove={handleRemove}
                animateState={animateState}
              />
            )}
          </Transition>
        );
      })}
    </TransitionGroup>
  );
}

NotificationGroup.defaultProps = {
  ...baseDefaultProps,
};
export default NotificationGroup;
