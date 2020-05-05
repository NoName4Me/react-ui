import React, { createRef } from 'react';
import ReactDOM from 'react-dom';
import NotificationContainer from './NotificationContainer';
import { NoticeProps } from './Notification';

export type NotificationApi = {
  add: (config: NoticeProps | string) => string;
  remove: (id: string) => void;
};
const notifyContainerRef = createRef<NotificationApi>();

let container: Element;
const NotificationManager: { [key: string]: any } = {
  notify(config: NoticeProps | string): string {
    if (!container) {
      container = document.createElement('div');
      document.body.appendChild(container);
    }
    if (!notifyContainerRef.current) {
      ReactDOM.render(<NotificationContainer ref={notifyContainerRef} />, container);
    }
    return notifyContainerRef.current!.add(config);
  },
};

['error', 'warn', 'success', 'info', 'hint', 'plain'].forEach((type) => {
  NotificationManager[type] = (config: NoticeProps | string) => {
    if (typeof config === 'string') {
      return NotificationManager.notify({ type, title: config });
    } else {
      return NotificationManager.notify({ ...config, type });
    }
  };
});

NotificationManager.remove = (id: string) => {
  notifyContainerRef.current!.remove(id);
};

export default NotificationManager;
