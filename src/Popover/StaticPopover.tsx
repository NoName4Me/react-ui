import React, { ReactNode, useEffect, useRef, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { BaseProps, baseDefaultProps, basePropsType } from '../common';
import { Placement } from './Popover';
import './index.scss';
import ReactDOM from 'react-dom';

function getTriggerEl(trigger: ReactNode | (() => ReactNode)) {
  return typeof trigger === 'function' ? trigger() : trigger;
}

interface PopoverProps extends BaseProps {
  trigger: ReactNode | (() => ReactNode);
  placement: Placement;
  distanceToTarget: number;
}

function Popover(props: PopoverProps) {
  const { trigger, placement, distanceToTarget, children, clsPrefix,extraCls, ...rest } = props;
  const cmpCls = `${clsPrefix}-Popover`;
  const popRef = useRef<HTMLDivElement>(null);
  const triggerEl = getTriggerEl(trigger);

  useEffect(() => {
    if (popRef.current) {
      const popRect = popRef.current.getBoundingClientRect();
      const triggerRect = triggerEl.getBoundingClientRect();
      const [first, second] = placement.split('-');
      let top = 0;
      let left = 0;
      // 算出指定方位的 top 和 left
      if (first === 'top' || first === 'bottom') {
        top = triggerRect[first] - (first === 'top' ? distanceToTarget + popRect.height : -distanceToTarget);
        if (second === 'start') {
          left = triggerRect.left;
        } else if (second === 'end') {
          left = triggerRect.right - popRect.width;
        } else {
          left = triggerRect.left + (triggerRect.width - popRect.width) / 2;
        }
      } else if (first === 'left' || first === 'right') {
        left = triggerRect[first] - (first === 'left' ? distanceToTarget + popRect.width : -distanceToTarget);
        if (second === 'start') {
          top = triggerRect.top;
        } else if (second === 'end') {
          top = triggerRect.bottom - popRect.height;
        } else {
          top = triggerRect.top + (triggerRect.height - popRect.height) / 2;
        }
      }
      popRef.current.style.top = top + 'px';
      popRef.current.style.left = left + 'px';
      // 是否足够放置
      // 是，渲染
      // 否，算出剩余 11 个方位的 top 和 left
      // 是否有可放置的
      // 是，渲染
      // 否，使用原位放置
    }

    return () => {};
  }, [trigger]);

  if (!triggerEl) return null;
  return ReactDOM.createPortal(
    <div ref={popRef} {...rest} className={cmpCls}>
      {children}
    </div>,
    document.body,
  );
}

Popover.propTypes = {
  ...basePropsType,
  placement: PropTypes.oneOf(Object.values(Placement)),
  distanceToTarget: PropTypes.number
};

Popover.defaultProps = {
  ...baseDefaultProps,
  distanceToTarget: 0,
  placement: Placement.TOP,
};

export default Popover;
