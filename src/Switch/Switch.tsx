import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { BaseProps, baseDefaultProps, basePropsType } from '../common';
import './index.scss';
import clsx from 'clsx';
import { bem } from '../utils';

interface SwitchProps extends BaseProps {
  /** 悬浮提示 */
  title?: string;
  /** 小型 */
  small?: boolean;
  /** 圆型 */
  round?: boolean;
  /** 开关标志 */
  value?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 开关事件 */
  onChange?: (val: boolean) => void;
}

function Switch(props: SwitchProps) {
  const { title, small, round, disabled, value, onChange, children, clsPrefix, ...rest } = props;
  const handleChange: React.EventHandler<ChangeEvent<HTMLInputElement>> = event => {
    onChange && onChange(event.target.checked);
  };
  const cmpCls = `${clsPrefix}-Switch`;

  return (
    <label {...rest} className={clsx(cmpCls, bem(cmpCls, '', { small, round, disabled }))} title={title}>
      <input
        className={bem(cmpCls, 'input')}
        checked={value}
        disabled={disabled}
        type="checkbox"
        onChange={handleChange}
      />
      <span className={bem(cmpCls, 'Slider')} />
    </label>
  );
}

Switch.propTypes = {
  ...basePropsType,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  round: PropTypes.bool,
  small: PropTypes.bool,
  title: PropTypes.string,
};

Switch.defaultProps = {
  ...baseDefaultProps,
};

export default Switch;
