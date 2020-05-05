import React, { useReducer, useRef, useImperativeHandle, forwardRef } from 'react';
import { NotificationApi } from './NotificationManager';
import { NoticeProps } from './Notification';
import NotificationGroup from './NotificationGroup';

export interface NoticeFullProps extends NoticeProps {
  id: string;
  placement: string;
}

type State = { [key: string]: NoticeFullProps[] };

export enum Action {
  Add = 'add',
  Remove = 'remove',
  RemoveAll = 'removeAll',
}

export type ActionProps = {
  type: Action;
  payload: NoticeFullProps | { id: string };
};

export const Placement = {
  LEFT_TOP: 'left-top',
  LEFT_BOTTOM: 'left-bottom',
  RIGHT_TOP: 'right-top',
  RIGHT_BOTTOM: 'right-bottom',
  CENTER_TOP: 'center-top',
  CENTER_BOTTOM: 'center-bottom',
};

function initState() {
  return {};
}

const isNeedReverse = (placement: string) =>
  placement === Placement.RIGHT_BOTTOM || placement === Placement.LEFT_BOTTOM || placement === Placement.CENTER_BOTTOM;

function reducer(state: State, action: ActionProps) {
  const { type, payload } = action;

  if (type === Action.Add) {
    const { placement } = payload as NoticeFullProps;
    const notices = state[placement] || [];
    return {
      ...state,
      [placement]: isNeedReverse(placement) ? [payload].concat(notices) : notices.concat(payload as NoticeFullProps),
    };
  } else if (type === Action.Remove) {
    const newState = { ...state };
    Object.entries(newState).map(([key, value]) => {
      newState[key] = value.filter((notice) => payload.id !== notice.id);
    });
    return newState;
  } else if (type === Action.RemoveAll) {
    return initState();
  }
  return state;
}

const defaultConfig = {
  placement: Placement.RIGHT_TOP,
  duration: 3000,
  type: 'info',
  showClose: false,
};

const getDefaultDuration = (type: string) => {
  if (type === 'error') {
    return 10000;
  }
  if (type === 'warn') {
    return 6000;
  }
  return 3000;
};

function normalizePayload(config: string | NoticeProps) {
  let result: NoticeProps = {};
  if (typeof config === 'string') {
    result.title = config;
  } else {
    result = config;
  }
  const id = Date.now() + '' + Math.random();
  if (result.type === 'error') {
    result.showClose = 'showClose' in result ? result.showClose : true;
  }
  const autoDismiss = 'autoDismiss' in result ? result.autoDismiss : !result.showClose;
  const duration = getDefaultDuration(result.type || 'info');
  const fullConfig = { ...defaultConfig, id, ...result, duration, autoDismiss };
  return fullConfig;
}

function NotificationContainer(props: any, ref: React.Ref<NotificationApi>) {
  const [state, dispatch] = useReducer(reducer, {}, initState);
  const containerRef = useRef(null);
  useImperativeHandle(ref, () => ({
    add: (payload: NoticeProps | string) => {
      const res = normalizePayload(payload);
      dispatch({ type: Action.Add, payload: res });
      return res.id;
    },
    remove: (id: string) => {
      dispatch({ type: Action.Remove, payload: { id } });
    },
  }));
  return (
    <div ref={containerRef}>
      {Object.keys(state).map((placement) => {
        const key = `Notification-${placement}`;
        return <NotificationGroup key={key} placement={placement} notices={state[placement]} dispatch={dispatch} />;
      })}
    </div>
  );
}

export default forwardRef(NotificationContainer);
