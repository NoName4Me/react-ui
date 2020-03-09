import PropTypes from 'prop-types';
import { DEFAULT_CLASS_PREFIX } from './const';

export const stringNumberPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
export const basePropsType = {
  extraCls: PropTypes.string,
  clsPrefix: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};
export const baseInputPropsType = {
  ...basePropsType,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
};
export const baseDefaultProps = {
  clsPrefix: DEFAULT_CLASS_PREFIX,
};
