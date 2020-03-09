import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { noop, baseDefaultProps, basePropsType, StringNumberType, stringNumberPropType } from '../common';
import { BaseProps } from '../common/BaseProps';
import './index.scss';

import Checkbox, { CheckboxProps } from './Checkbox';
import clsx from 'clsx';
export interface CheckboxOption {
  label: string;
  value: StringNumberType;
  disabled?: boolean;
}
interface CheckboxGroupProps extends BaseProps {
  value?: StringNumberType[];
  disabled?: boolean;
  options: CheckboxOption[];
  onChange?: (value: StringNumberType[], indeterminate: boolean) => void;
}

const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { value = [], options, onChange, disabled, clsPrefix, extraCls, ...rest } = props;
  const handleChange = (checked: boolean, val: StringNumberType) => {
    let selected = value || [];
    if (checked) {
      selected = selected.concat(val);
    } else {
      selected = selected.filter(item => val !== item);
    }
    onChange && onChange(selected, !!selected.length && selected.length !== options.length);
  };

  const valueMap = useMemo(() => {
    const map = new Map();
    value.map(item => map.set(item, true));
    return map;
  }, [value]);
  const cmpCls = `${clsPrefix}-CheckboxGroup`;
  return (
    <div {...rest} className={clsx(cmpCls, extraCls)}>
      {options &&
        options.map(({ disabled: itemDisabled, value: itemValue, ...others }: CheckboxProps, idx) => {
          return (
            <Checkbox
              key={idx}
              {...others}
              disabled={disabled || itemDisabled}
              onChange={handleChange}
              value={itemValue}
              checked={valueMap.has(itemValue)}
            />
          );
        })}
    </div>
  );
};

CheckboxGroup.propTypes = {
  ...basePropsType,
  value: PropTypes.arrayOf(stringNumberPropType),
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: stringNumberPropType.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
  ),
};

CheckboxGroup.defaultProps = {
  ...baseDefaultProps,
  value: [],
  onChange: noop,
};

export default CheckboxGroup;
