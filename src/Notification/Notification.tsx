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
  /** 展示时间，error 10s, warn 8s, 其它 3s*/
  showDuration?: number;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 是否自动销毁，当 showClose 为 true 时，默认为 false，除非显示指定 */
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
    showClose,
    children,
    clsPrefix,
    ...rest
  } = props;
  const timer = useRef(-1);
  useEffect(() => {
    if (showDuration && animateState === 'entered') {
      timer.current = window.setTimeout(() => {
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
      {showClose && <Icon extraCls={bem(cmpCls, 'closeBtn')} size={18} type="times" onClick={handleClose} />}
    </div>
  );
}

Notification.propTypes = {
  ...basePropsType,
  type: PropTypes.oneOf(types),
  showClose: PropTypes.bool,
  autoDismiss: PropTypes.bool,
  showDuration: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

Notification.defaultProps = {
  ...baseDefaultProps,
  type: 'info',
  showClose: false,
};

export default Notification;
