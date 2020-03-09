import React from 'react';
import PropTypes from 'prop-types';
import { baseDefaultProps, baseInputPropsType, StringNumberType, stringNumberPropType } from '../common';
import { BaseInputProps } from '../common/BaseProps';
import './index.scss';
import Radio from './Radio';
import clsx from 'clsx';

export interface RadioOption {
  value: StringNumberType;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps extends BaseInputProps {
  /** 文本 */
  label?: string;
  /** 选中项改变事件 */
  onChange?: (val: StringNumberType) => void;
  /** 当前选中值 */
  value?: StringNumberType;
  /** 选项 */
  options?: RadioOption[];
}

const RadioGroup = (props: RadioGroupProps) => {
  const { disabled, value, extraCls, options, children, clsPrefix, onChange, ...rest } = props;

  const handleChange = (val: StringNumberType) => {
    onChange && onChange(val);
  };

  const cmpCls = `${clsPrefix}-RadioGroup`;
  let radioList = children;
  if (Array.isArray(options) && options.length) {
    const name = 'Radio-' + Math.random();
    radioList = options.map(({ value: itemValue, disabled: itemDisabled, ...others }, index) => {
      return (
        <Radio
          {...others}
          disabled={disabled || itemDisabled}
          name={name}
          key={index}
          value={itemValue}
          checked={itemValue === value}
          onChange={handleChange}
        />
      );
    });
  } else if (Array.isArray(radioList)) {
    radioList = React.Children.map(radioList as React.ReactElement[], function(child: React.ReactElement) {
      return React.cloneElement(child, {
        checked: child.props.value === value,
        onChange: handleChange,
        name: 'name' in child.props ? child.props.name : name,
      });
    });
  }
  return (
    <div {...rest} className={clsx(cmpCls, extraCls)}>
      {radioList}
    </div>
  );
};

RadioGroup.propTypes = {
  ...baseInputPropsType,
  value: stringNumberPropType,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: stringNumberPropType.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
  ),
};

RadioGroup.defaultProps = {
  ...baseDefaultProps,
};

export default RadioGroup;
