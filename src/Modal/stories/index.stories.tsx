import React, { useState } from 'react';
import Modal from '../index';
import Button from '../../Button';

export default {
  title: 'Story|Modal',
};

export const base = () => {
  const [isOpen, show] = useState(false);
  return (
    <>
      <Button onClick={() => show(true)}>show a dialog</Button>
      {isOpen && (
        <Modal onClose={() => show(false)} title="This is a dialog">
          <p>Line one: 第一行</p>
          <p>Line two: 第二行</p>
        </Modal>
      )}
    </>
  );
};

base.story = {
  name: '基础',
};

export const close = () => {
  const [isOpen, show] = useState(false);
  const handleClose = () => show(false);
  return (
    <>
      <Button onClick={() => show(true)}>click to open</Button>
      {isOpen && (
        <Modal
          isEscapeKeyClosable
          isMaskClickClosable
          isShowClose
          onClose={handleClose}
          title="几种关闭方式"
          footer={
            <Button type="text" onClick={handleClose}>
              知道了
            </Button>
          }
        >
          <ul>
            <li>Escape 键 isEscapeKeyClosable</li>
            <li>确定</li>
            <li>点击遮罩 isMaskClickClosable</li>
            <li>右上角关闭 isShowClose</li>
          </ul>
        </Modal>
      )}
    </>
  );
};

close.story = {
  name: '关闭方式',
};

export const draggable = () => {
  const [isOpen, show] = useState(false);
  return (
    <>
      <Button onClick={() => show(true)}>draggable dialog</Button>
      {
        <Modal isOpen={isOpen} draggable onClose={() => show(false)} title="拖拽我">
          <ul>
            <li>draggable</li>
          </ul>
        </Modal>
      }
    </>
  );
};

draggable.story = {
  name: '可拖拽',
};
