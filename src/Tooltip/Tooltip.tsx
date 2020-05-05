import React, { useMemo, ReactElement, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BaseProps, baseDefaultProps, basePropsType, StringKeyObject } from '../common';
import './index.scss';
import ReactDOM from 'react-dom';
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

interface TooltipContainerProps extends BaseProps {
  content: string;
  isShowArrow?: boolean;
  distanceToTarget: number;
  placement: Placement;
  leaveDelay?: number;
  interactive: boolean;
}

interface TooltipProps extends TooltipContainerProps {
  refRect: DOMRect;
  // isShow: boolean;
  tooltipHoverHandler: (isHovering: boolean) => void;
}

function Tooltip(props: TooltipProps) {
  const {
    style,
    placement,
    children,
    distanceToTarget,
    refRect,
    isShowArrow,
    clsPrefix,
    content,
    interactive,
    tooltipHoverHandler,
    ...rest
  } = props;
  const tooltipEl = useRef<HTMLDivElement>(null!);
  const [coordinate, setCoordinate] = useState({});
  const [opacity, setOpacity] = useState(0);
  const rafRef = useRef(-1);
  useEffect(() => {
    const { clientWidth: width, clientHeight: height } = tooltipEl.current;
    const pos: StringKeyObject<string> = {};
    const [first, second] = placement.split('-');
    if (first === 'top' || first === 'bottom') {
      pos.top = refRect[first] - (first === 'top' ? distanceToTarget + height : -distanceToTarget) + 'px';
      if (second === 'start') {
        pos.left = refRect.left + 'px';
      } else if (second === 'end') {
        pos.left = refRect.right - width + 'px';
      } else {
        pos.left = refRect.left + (refRect.width - width) / 2 + 'px';
      }
    } else if (first === 'left' || first === 'right') {
      pos.left = refRect[first] - (first === 'left' ? distanceToTarget + width : -distanceToTarget) + 'px';
      if (second === 'start') {
        pos.top = refRect.top + 'px';
      } else if (second === 'end') {
        pos.top = refRect.bottom - height + 'px';
      } else {
        pos.top = refRect.top + (refRect.height - height) / 2 + 'px';
      }
    }
    rafRef.current = requestAnimationFrame(() => {
      setOpacity(1);
    });
    setCoordinate(pos);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [content]);
  const handleMouseEnter = () => {
    if (interactive) {
      tooltipHoverHandler(true);
    }
  };
  const handleMouseLeave = () => {
    if (interactive) {
      tooltipHoverHandler(false);
    }
  };

  const cmpCls = `${clsPrefix}-Tooltip`;
  return (
    <div
      {...rest}
      className={cmpCls}
      ref={tooltipEl}
      style={{ ...coordinate, opacity, ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={bem(cmpCls, 'Content')}>{content}</div>
      {isShowArrow && <div className={bem(cmpCls, 'Arrow', ['', placement])}></div>}
    </div>
  );
}

function TooltipContainer(props: TooltipContainerProps) {
  const { interactive, leaveDelay, children, ...rest } = props;
  const refRect = useRef<DOMRect>(null!);
  const timer = useRef(-1);
  const [isShow, toggleShow] = useState(false);
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactive && leaveDelay) {
      clearTimeout(timer.current);
    }
    refRect.current = (event.target as HTMLElement).getBoundingClientRect();
    toggleShow(true);
  };
  const handleMouseLeave = () => {
    if (interactive && leaveDelay) {
      timer.current = window.setTimeout(() => {
        toggleShow(false);
      }, leaveDelay);
    } else {
      toggleShow(false);
    }
  };
  const tooltipHoverHandler = (isHovering: boolean) => {
    if (isHovering) {
      clearTimeout(timer.current);
    } else {
      timer.current = window.setTimeout(() => {
        toggleShow(false);
      }, leaveDelay);
    }
  };

  return (
    <>
      {React.cloneElement(children as ReactElement, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      {isShow &&
        ReactDOM.createPortal(
          <Tooltip
            interactive={interactive}
            tooltipHoverHandler={tooltipHoverHandler}
            refRect={refRect.current}
            {...rest}
          />,
          document.body,
        )}
    </>
  );
}

TooltipContainer.propTypes = {
  ...basePropsType,
  isShowArrow: PropTypes.bool,
  distanceToTarget: PropTypes.number,
  content: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(Object.values(Placement)),
};

TooltipContainer.defaultProps = {
  ...baseDefaultProps,
  isShowArrow: true,
  distanceToTarget: 10,
  placement: Placement.TOP,
  leaveDelay: 300,
  interactive: false,
};

export default TooltipContainer;
