import React from 'react';
import { Icon } from '..';
import { bem } from '../utils';

export interface HeaderProps {
  title?: string;
  isShowClose: boolean;
  onClose: () => void;
}

interface _HeaderProps extends HeaderProps {
  cmpCls: string;
}

function Header(props: _HeaderProps) {
  const { title, cmpCls, onClose, isShowClose } = props;
  return (
    <>
      <h2>{title}</h2>
      {isShowClose && <Icon extraCls={bem(cmpCls, 'Close')} onClick={onClose} type="times" size={18} />}
    </>
  );
}

export default Header;
