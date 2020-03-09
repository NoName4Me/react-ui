import React, { ReactElement, useEffect, createRef, useRef } from 'react';
import PropTypes from 'prop-types';
import { BaseProps, baseDefaultProps, basePropsType } from '../common';
import './index.scss';
import Icon from '../Icon';
import { bem } from '../utils';
import clsx from 'clsx';

const types = ['error', 'warn', 'success', 'info', 'hint', 'plain'] as const;
export type NotificationType = typeof types[number];
export interface NoticeProps {
  type: NotificationType;
  title?: string;
  content?: ReactElement | string;
  showDuration?: number;
  closable?: boolean;
  autoDismiss?: boolean;
}
interface NotificationProps extends BaseProps, NoticeProps {
  id?: string;
  activeBackground?: boolean;
  animateState?: string;
  onRemove?: Function;
}

function Notification(props: NotificationProps) {
  const {
    id,
    onRemove,
    type,
    title,
    content,
    animateState,
    autoDismiss,
    showDuration,
    closable,
    children,
    clsPrefix,
    ...rest
  } = props;
  const timer = useRef(-1);
  useEffect(() => {
    if (autoDismiss && animateState === 'entered') {
      timer.current = setTimeout(() => {
        onRemove && onRemove(id);
      }, showDuration);
    }
  }, [animateState]);
  useEffect(() => {
    return () => {
      onRemove && onRemove(id);
    };
  }, []);
  const handleClose = () => {
    clearTimeout(timer.current);
    onRemove && onRemove(id);
  };
  const cmpCls = `${clsPrefix}-Notification`;
  return (
    <div {...rest} className={clsx(cmpCls, bem(cmpCls, '', type))}>
      <div className={bem(cmpCls, 'main')}>
        {title && <div className={bem(cmpCls, 'title')}>{title}</div>}
        {(children || content) && <div className={bem(cmpCls, 'content')}>{children ? children : content}</div>}
      </div>
      {closable && <Icon extraCls={bem(cmpCls, 'closeBtn')} type="close" onClick={handleClose} />}
    </div>
  );
}

Notification.propTypes = {
  ...basePropsType,
  type: PropTypes.oneOf(types),
  closable: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

Notification.defaultProps = {
  ...baseDefaultProps,
  type: 'info',
  closable: false,
};

export default Notification;
