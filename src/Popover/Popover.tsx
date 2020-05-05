import React, { useEffect, useRef, ReactElement, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { BaseProps, baseDefaultProps, basePropsType, NOOP } from '../common';
import './index.scss';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import Transition from '../Transition';
import { bem } from '../utils';

export enum Placement {
  TOP_START = 'top-start',
  TOP = 'top',
  TOP_END = 'top-end',
  LEFT_START = 'left-start',
  LEFT = 'left',
  LEFT_END = 'left-end',
  BOTTOM_START = 'bottom-start',
  BOTTOM = 'bottom',
  BOTTOM_END = 'bottom-end',
  RIGHT_START = 'right-start',
  RIGHT = 'right',
  RIGHT_END = 'right-end',
}

interface PopoverProps extends BaseProps {
  children: ReactElement;
  placement: Placement;
  distanceToTarget: number;
  interactive: boolean;
  /** 为了实现 interactive 效果，设置的缓冲时间，离开目标元素 leaveDelay 时长后，如果没有悬浮在 popover 上则移除 popover */
  leaveDelay: number;
  showWhen: 'hover' | 'click';
  PopContent: ReactElement;
  disableScroll: boolean;
  transitionConfig: {
    Cmp: typeof Transition;
    duration: number;
  };
  onClose: () => void;
}

function getParentElement(element: HTMLElement) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentElement;
}

function getScrollParent(element: HTMLElement | null): HTMLElement {
  if (!element || ['HTML', 'BODY'].includes(element.nodeName)) {
    return document.body;
  }

  const parent = getParentElement(element);

  if (!parent) return document.body;

  const { overflow, overflowX, overflowY } = window.getComputedStyle(parent);
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return parent;
  }

  return getScrollParent(parent);
}

function getWindow(element: HTMLElement) {
  return (element && (element.ownerDocument || document).defaultView) || window;
}

function addScrollEvent(startEl: HTMLElement, handler: () => void, parentList: Element[]) {
  const parent = getScrollParent(startEl);
  const isBody = parent.nodeName === 'BODY';
  (isBody ? getWindow(parent) : parent).addEventListener('scroll', handler, { passive: true });
  if (!isBody) {
    addScrollEvent(parent, handler, parentList);
  }
  parentList.push(parent);
}

function removeScrollEvent(parentList: Element[], handler: () => void) {
  parentList.forEach((element) => {
    element.removeEventListener('scroll', handler);
  });
}

function isPointInViewRange(element: Element, x: number, y: number) {
  const rect = element.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function Popover(props: PopoverProps) {
  const {
    PopContent,
    showWhen,
    interactive,
    leaveDelay,
    placement,
    distanceToTarget,
    children,
    clsPrefix,
    extraCls,
    transitionConfig,
    disableScroll,
    onClose,
    style,
    ...rest
  } = props;
  const { Cmp: TransitionCmp, duration } = transitionConfig;
  const [triggerEl, setTriggerEl] = useState<HTMLElement>(null!);
  const cmpCls = `${clsPrefix}-Popover`;
  const popRef = useRef<HTMLDivElement>(null!);
  const scrollEventElementList = useRef<HTMLElement[]>(null!);
  const timer = useRef(-1);

  const updatePoperPosition = useCallback(() => {
    if (popRef.current && triggerEl) {
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
  }, [triggerEl]);

  useEffect(() => {
    updatePoperPosition();
    return () => {};
  }, [updatePoperPosition]);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && leaveDelay) {
      clearTimeout(timer.current);
    }
    setTriggerEl(event.target as HTMLElement);
    children.props.onMouseEnter && children.props.onMouseEnter(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && leaveDelay) {
      timer.current = window.setTimeout(() => {
        setTriggerEl(null!);
      }, leaveDelay);
    } else {
      setTriggerEl(null!);
    }

    children.props.onMouseLeave && children.props.onMouseLeave(event);
  };
  const handlePopMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    clearTimeout(timer.current);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && leaveDelay) {
      clearTimeout(timer.current);
    }
    setTriggerEl(triggerEl ? null! : (event.target as HTMLElement));
    children.props.onClick && children.props.onClick(event);
  };

  const handleWhetherClosePopover = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!popRef.current.contains(event.target as Node)) {
        setTriggerEl(null!);
      }
    },
    [triggerEl],
  );

  const triggerEventHandlers =
    showWhen === 'hover'
      ? {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
        }
      : {
          onClick: handleClick,
        };
  const popEventHandlers = interactive
    ? {
        onMouseEnter: handlePopMouseEnter,
        onMouseLeave: handleMouseLeave,
      }
    : {};
  const transitionHandlers = {
    onExit: (node: HTMLDivElement) => {
      if (disableScroll) {
        node.ownerDocument!.body.style.overflow = '';
      } else {
        removeScrollEvent(scrollEventElementList.current, updatePoperPosition);
        scrollEventElementList.current = null!;
        window.removeEventListener('resize', updatePoperPosition);
      }
    },
    onEnter: (node: HTMLDivElement) => {
      if (disableScroll) {
        node.ownerDocument!.body.style.overflow = 'hidden';
      } else {
        scrollEventElementList.current = [];
        addScrollEvent(triggerEl, updatePoperPosition, scrollEventElementList.current);
        window.addEventListener('resize', updatePoperPosition);
      }
    },
  };

  return (
    <>
      {React.cloneElement(children as ReactElement, {
        ...triggerEventHandlers,
      })}
      {ReactDOM.createPortal(
        <TransitionCmp show={!!triggerEl} duration={duration} {...transitionHandlers}>
          <div className={clsx(bem(cmpCls, '', ['', { scrollable: !disableScroll }]), extraCls)}>
            <div
              className={bem(cmpCls, 'Backdrop')}
              onClick={handleWhetherClosePopover}
              style={{ pointerEvents: disableScroll ? 'initial' : 'none' }}
            ></div>
            <div ref={popRef} className={bem(cmpCls, 'Content')} {...popEventHandlers} {...rest}>
              {PopContent}
            </div>
          </div>
        </TransitionCmp>,
        document.body,
      )}
    </>
  );
}

Popover.propTypes = {
  ...basePropsType,
  placement: PropTypes.oneOf(Object.values(Placement)),
  distanceToTarget: PropTypes.number,
  interactive: PropTypes.bool,
  leaveDelay: PropTypes.number,
  showWhen: PropTypes.oneOf(['hover', 'click']),
  /** 当 popover 展示时，是否禁用滚动，false 时跟随目标滚动，并响应 window resize 事件 */
  disableScroll: PropTypes.bool,
  transitionConfig: PropTypes.object,
  /** 关闭回调，用来真正关闭 popover */
  onClose: PropTypes.func,
};

Popover.defaultProps = {
  ...baseDefaultProps,
  placement: Placement.TOP,
  /** //TODO: 确认是否还存在该问题：因为计算的 popover 坐标与目标元素有细微重叠，导致的 mouseenter/leave 中状态判断异常 */
  distanceToTarget: 0,
  /** 鼠标悬浮到 popover 上时，popover 不消失 */
  interactive: false,
  /** 为了实现interactive效果，设置的缓冲时间，离开目标元素 leaveDelay 时长后，如果没有悬浮在 popover 上则移除 popover */
  leaveDelay: 200,
  showWhen: 'hover',
  disableScroll: false,
  transitionConfig: {
    Cmp: Transition,
    duration: 0,
  },
  onClose: NOOP,
};

export default Popover;
