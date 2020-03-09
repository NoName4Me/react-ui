import React, { useReducer, useRef, useImperativeHandle, forwardRef } from 'react';
import { NoticeProps, NoticeMapType, NoticeFullProps, NotificationApi } from './NotificationHub';
import NotificationGroup from './NotificationGroup';

export enum Action {
  Add = 'add',
  Remove = 'remove',
  RemoveAll = 'removeAll',
}

export type ActionProps = {
  type: Action;
  payload: NoticeFullProps | { placement: string; id: string };
};

export const Placement = {
  LEFT_TOP: 'left-top',
  LEFT_BOTTOM: 'left-bottom',
  RIGHT_TOP: 'right-top',
  RIGHT_BOTTOM: 'right-bottom',
  CENTER_TOP: 'center-top',
  CENTER_BOTTOM: 'center-bottom',
};

const isNeedReverse = (placement: string) =>
  placement === Placement.RIGHT_BOTTOM || placement === Placement.LEFT_BOTTOM || placement === Placement.CENTER_BOTTOM;

function reducer(state: NoticeMapType, action: ActionProps) {
  const { type, payload } = action;
  const { placement } = payload;
  if (type === Action.Add) {
    const notices = state[placement] || [];
    return { ...state, [placement]: isNeedReverse(placement) ? [payload].concat(notices) : notices.concat(payload) };
  } else if (type === Action.Remove) {
    const notices = (state[placement] || []).filter(notice => payload.id !== notice.id);
    return { ...state, [placement]: notices };
  }
  return state;
}

const defaultConfig = {
  placement: Placement.RIGHT_TOP,
  showDuration: 3000,
  type: 'info',
  closable: false,
  autoDismiss: true,
};

function normalizePayload(config: string | NoticeProps) {
  let result: NoticeProps = {};
  if (typeof config === 'string') {
    result.title = config;
  } else {
    result = config;
  }
  const id = Date.now() + '' + Math.random();
  return { ...defaultConfig, id, ...result };
}

function NotificationContainer(props: any, ref: React.Ref<NotificationApi>) {
  const [state, dispatch] = useReducer(reducer, {});
  const containerRef = useRef(null);
  useImperativeHandle(ref, () => ({
    add: (payload: NoticeProps) => {
      dispatch({ type: Action.Add, payload: normalizePayload(payload) });
    },
  }));
  return (
    <div ref={containerRef}>
      {Object.keys(state).map(placement => {
        const key = `Notification-${placement}`;

        return <NotificationGroup key={key} placement={placement} notices={state[placement]} dispatch={dispatch} />;
      })}
    </div>
  );
}

export default forwardRef(NotificationContainer);
