import React from 'react';

export interface BaseProps {
  /** 自定义类 */
  extraCls?: string;
  /** 类前缀，默认 `'Paper'`，如 `Button` 组件类名为 `'Paper-Button'` */
  clsPrefix?: string;
  children?: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
}
export interface BaseInputProps extends BaseProps {
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
}
