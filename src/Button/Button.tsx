import React, { MouseEvent, FunctionComponent as FC, useRef } from 'react';
import PropTypes from 'prop-types';
import { baseDefaultProps, basePropsType } from '../common';
import { BaseProps } from '../common/BaseProps';
import clsx from 'clsx';
import './index.scss';
import { bem } from '../utils';

interface ButtonProps extends BaseProps {
  size?: 'normal' | 'big' | 'small';
  type?: 'fill' | 'text' | 'frame';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const { size, type, onClick, extraCls, clsPrefix, disabled, children, ...rest } = props;
  const buttonCls = `${clsPrefix}-Button`;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur();
    onClick && onClick(event);
  };
  return (
    <button
      disabled={disabled}
      className={clsx(buttonCls, bem(buttonCls, '', [size, type]), extraCls)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  ...basePropsType,
  /** 大小 */
  size: PropTypes.oneOf(['normal', 'big', 'small']),
  /** 类型 */
  type: PropTypes.oneOf(['fill', 'text', 'frame']),
  /** 点击事件 */
  onClick: PropTypes.func,
  /** 是否禁用 */
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  ...baseDefaultProps,
  size: 'normal',
  type: 'fill',
};

export default Button;
