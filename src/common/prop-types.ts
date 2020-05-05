import PropTypes from 'prop-types';
import { DEFAULT_CLASS_PREFIX } from './const';

export const stringNumberPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
export const basePropsType = {
  /** 自定义 css 类 */
  extraCls: PropTypes.string,
  /** 默认 css 类前缀 */
  clsPrefix: PropTypes.string,
  /** 传入样式 */
  style: PropTypes.objectOf(PropTypes.string),
};
export const baseInputPropsType = {
  ...basePropsType,
  /** 是否禁用 */
  disabled: PropTypes.bool,
  /** 是否只读 */
  readonly: PropTypes.bool,
};
export const baseDefaultProps = {
  clsPrefix: DEFAULT_CLASS_PREFIX,
  children: null,
  extraCls: '',
};
