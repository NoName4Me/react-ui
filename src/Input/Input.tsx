import React, { ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { baseDefaultProps, baseInputPropsType } from '../common/prop-types';
import { BaseInputProps } from '../common/BaseProps';
import clsx from 'clsx';

import './index.scss';
import Icon from '../Icon';
import { isEmptyValue } from '../common';

interface InputProps extends BaseInputProps {
  value: string;
  onChange: (value: string, event?: ChangeEvent<HTMLInputElement>) => void;
  /** 是否显示清空按钮 */
  clearable?: boolean;
  /** 提示文字 */
  placeholder?: string;
  /** 是否为下划线样式 */
  underlined?: boolean;
  /** 后缀 */
  suffix?: React.ReactElement;
}

/**
 * 简单的 Input
 *
 */
function Input(props: InputProps) {
  const { suffix, readonly, disabled, clearable, underlined, clsPrefix, onChange, value, placeholder, ...rest } = props;
  const cmpCls = `${clsPrefix}-Input`;
  const notShowClearIcon = !clearable || disabled || readonly || isEmptyValue(value);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value, event);
  };

  const suffixEl =
    suffix ||
    (!notShowClearIcon && <Icon onClick={() => onChange('')} type="close" extraCls={`${cmpCls}__ClearIcon`} />);

  return (
    <div {...rest} className={clsx(cmpCls, !clearable && `${cmpCls}--noClear`, underlined && `${cmpCls}--underlined`)}>
      {suffixEl}
      <input
        value={value}
        disabled={disabled}
        readOnly={readonly}
        placeholder={placeholder}
        onChange={handleChange}
        className={`${cmpCls}__input`}
      />
    </div>
  );
}

Input.propTypes = {
  ...baseInputPropsType,
  value: PropTypes.string,
  onChange: PropTypes.func,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
  underlined: PropTypes.bool,
};

Input.defaultProps = {
  ...baseDefaultProps,
  clearable: false,
  placeholder: '请输入', //TODO: i18n
};

export default Input;
