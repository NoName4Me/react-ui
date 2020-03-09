import React, { FunctionComponent as FC } from 'react';
import PropTypes from 'prop-types';
import { baseDefaultProps, basePropsType, StringNumberType } from '../common';
import { BaseProps } from '../common/BaseProps';
import './index.scss';
import clsx from 'clsx';
import { bem } from '../utils';
import Icon from '../Icon';

export interface CheckboxProps extends BaseProps {
  label?: string;
  value?: StringNumberType;
  disabled?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean, value: StringNumberType) => void;
}

const Checkbox: FC<CheckboxProps> = props => {
  const { label, value, checked, onChange, indeterminate, disabled, clsPrefix, extraCls, ...rest } = props;
  const handleChange = () => {
    onChange && onChange(!checked, value as StringNumberType);
  };
  const cmpCls = `${clsPrefix}-Checkbox`;
  return (
    <label {...rest} className={clsx(cmpCls, extraCls, bem(cmpCls, '', { disabled }))}>
      <input
        className={bem(cmpCls, 'input', ['', { indeterminate: !checked && indeterminate }])}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
      <i className={bem(cmpCls, 'Button')}>
        {checked && <Icon extraCls={bem(cmpCls, 'Button', 'checked')} type="check" size={10} />}
      </i>
      {label}
    </label>
  );
};

Checkbox.propTypes = {
  ...basePropsType,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  ...baseDefaultProps,
};

export default Checkbox;
