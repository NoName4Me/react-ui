import React from 'react';
import PropTypes from 'prop-types';
import { baseDefaultProps, basePropsType } from '../common/prop-types';
import { BaseProps } from '../common/BaseProps';
import './index.scss';
import clsx from 'clsx';
import Close from './Close';
import Save from './Save';
import Trash from './Trash';
import ChevronUp from './ChevronUp';
import ChevronDown from './ChevronDown';
import Search from './Search';
import Check from './Check';
import Times from './Times';

const mapper: { [key: string]: typeof Save } = {
  save: Save,
  close: Close,
  times: Times,
  trash: Trash,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  search: Search,
  check: Check,
};

// const types = ['save','close','trash'] as const;
// type unionType = typeof types[number];

interface IconProps extends BaseProps {
  /** 指定图标, save | close | trash | check | search | chevron-up | chevron-down */
  type: string;
  /** 大小，单位 px */
  size?: number;
  /** 颜色 */
  color?: string;
  [key: string]: any;
}

const resetViewBox = (type: string) => {
  if (type === 'times') {
    return '0 0 320 512';
  }
  return '0 0 512 512';
};

function Icon(props: IconProps) {
  const { type, size, color, clsPrefix, extraCls, style, ...rest } = props;
  const IconPath = mapper[type];
  const cmpCls = `${clsPrefix}-Icon--${type}`;
  if (!IconPath) return null;
  return (
    <svg
      className={clsx(cmpCls, extraCls)}
      {...rest}
      style={{ color, width: size, height: size, ...style }}
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={resetViewBox(type)}
    >
      <IconPath />
    </svg>
  );
}

Icon.propTypes = {
  ...basePropsType,
  type: PropTypes.oneOf(Object.keys(mapper)).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
};

Icon.defaultProps = {
  ...baseDefaultProps,
  size: 14,
};

export default Icon;
