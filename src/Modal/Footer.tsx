import React from 'react';
import { Button } from '..';

export interface FooterProps {
  onClose: () => void;
}
export default function Footer({ onClose }: FooterProps) {
  return (
    <>
      <Button>确定</Button>
      <Button type="text" onClick={onClose}>
        取消
      </Button>
    </>
  );
}
