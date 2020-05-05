import React from 'react';
import PropTypes from 'prop-types';
import { BaseProps, baseDefaultProps, basePropsType } from '../common';
import './index.scss';

interface SelectProps extends BaseProps {}

function Select(props: SelectProps) {
  const { children, clsPrefix, ...rest } = props;
  const cmpCls = `${clsPrefix}-Select`;
  return (
    <div {...rest} className={cmpCls}>
      {children}
    </div>
  );
}

Select.propTypes = {
  ...basePropsType,
};

Select.defaultProps = {
  ...baseDefaultProps,
};

export default Select;
