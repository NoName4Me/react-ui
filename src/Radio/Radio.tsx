import React from 'react';
import PropTypes from 'prop-types';
import { baseDefaultProps, baseInputPropsType, StringNumberType, stringNumberPropType } from '../common';
import { BaseInputProps } from '../common/BaseProps';
import './index.scss';
import clsx from 'clsx';
import { bem } from '../utils';

export interface RadioProps extends BaseInputProps {
  /** 文本 */
  label?: string;
  /** 用于 radio 组时指定相同组 */
  name?: string;
  /** 是否选中 */
  checked?: boolean;
  /** 选项值 */
  value?: StringNumberType;
  onChange?: (val: StringNumberType) => void;
}

const Radio = (props: RadioProps) => {
  const { disabled, name, checked, onChange, label, value, clsPrefix, extraCls, ...rest } = props;
  const handleChange = () => {
    onChange && onChange(value as StringNumberType);
  };
  const cmpCls = `${clsPrefix}-Radio`;

  return (
    <label {...rest} className={clsx(cmpCls, extraCls, bem(cmpCls, '', { disabled }))}>
      <input
        disabled={disabled}
        type="radio"
        name={name}
        checked={checked}
        value={value}
        onChange={handleChange}
        className={`${cmpCls}__input`}
      />
      <i className={`${cmpCls}__Button`}></i>
      {label}
    </label>
  );
};

Radio.propTypes = {
  ...baseInputPropsType,
  label: PropTypes.string,
  name: PropTypes.string,
  value: stringNumberPropType,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

Radio.defaultProps = {
  ...baseDefaultProps,
};

export default Radio;
