import React, { MouseEvent, FunctionComponent as FC } from 'react';
import PropTypes from 'prop-types';
import { baseDefaultProps, basePropsType } from '../common';
import { BaseProps } from '../common/BaseProps';
import clsx from 'clsx';
import './index.scss';
import { bem } from '../utils';

interface ButtonProps extends BaseProps {
  /** 大小 */
  size?: 'normal' | 'big' | 'small';
  /** 类型 */
  type?: 'fill' | 'text' | 'frame';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

const Button: FC<ButtonProps> = props => {
  const { size, type, onClick, extraCls, clsPrefix, disabled, children, ...rest } = props;
  const buttonCls = `${clsPrefix}-Button`;
  return (
    <button
      disabled={disabled}
      className={clsx(buttonCls, bem(buttonCls, '', [size, type]), extraCls)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  ...basePropsType,
  size: PropTypes.oneOf(['normal', 'big', 'small']),
  type: PropTypes.oneOf(['fill', 'text', 'frame']),
  onClick: PropTypes.func,
};

Button.defaultProps = {
  ...baseDefaultProps,
  size: 'normal',
  type: 'fill',
};

export default Button;
