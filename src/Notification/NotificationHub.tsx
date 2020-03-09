import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import NotificationContainer from './NotificationContainer';

export interface NoticeProps {
  id?: string;
  title?: string;
  placement?: string;
  showDuration?: number;
  animateDuration?: number;
}

export interface NoticeFullProps extends NoticeProps {
  placement: string;
}

export type NoticeMapType = { [key: string]: NoticeFullProps[] };

export type NotificationApi = {
  add: Function;
};
const notifyContainerRef = createRef<NotificationApi>();

let container: Element;
const NotificationManager: { [key: string]: any } = {
  notify(config: NoticeProps) {
    if (!container) {
      container = document.createElement('div');
      document.body.appendChild(container);
    }
    if (!notifyContainerRef.current) {
      ReactDOM.render(<NotificationContainer ref={notifyContainerRef} />, container);
    }

    notifyContainerRef.current?.add(config);
  },
};

['error', 'warn', 'success', 'info', 'hint', 'plain'].forEach(type => {
  NotificationManager[type] = NotificationManager.notify.bind(NotificationManager);
});

export default NotificationManager;
