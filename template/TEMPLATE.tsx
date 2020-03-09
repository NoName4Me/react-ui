import React from 'react';
import PropTypes from 'prop-types';
import { BaseProps, baseDefaultProps, basePropsType } from '../common';
import './index.scss';

interface TEMPLATEProps extends BaseProps {}

function TEMPLATE(props: TEMPLATEProps) {
  const { children, clsPrefix, ...rest } = props;
  const cmpCls = `${clsPrefix}-TEMPLATE`;
  return (
    <div {...rest} className={cmpCls}>
      {children}
    </div>
  );
}

TEMPLATE.propTypes = {
  ...basePropsType,
};

TEMPLATE.defaultProps = {
  ...baseDefaultProps,
};

export default TEMPLATE;
