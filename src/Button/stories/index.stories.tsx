import React, { useState, useMemo } from 'react';
import Button from '..';
import Icon from '../../Icon';

export default {
  title: 'Story|Button',
};

export const base = () => {
  return (
    <>
      <Button size="big">大号按钮</Button>
      <Button size="big" type="frame">
        大号按钮
      </Button>
      <Button size="big" type="text">
        大号按钮
      </Button>

      <Button>普通按钮</Button>
      <Button type="frame">普通按钮</Button>
      <Button type="text">普通按钮</Button>

      <Button size="small">小号按钮</Button>
      <Button size="small" type="frame">
        小号按钮
      </Button>
      <Button size="small" type="text">
        小号按钮
      </Button>
    </>
  );
};
base.story = {
  name: '基础',
};

export const disable = () => {
  return (
    <>
      <Button disabled>普通按钮</Button>
      <Button disabled type="frame">
        普通按钮
      </Button>
      <Button disabled type="text">
        普通按钮
      </Button>
    </>
  );
};
disable.story = {
  name: '禁用',
};

export const customize = () => {
  return (
    <>
      <Button type="text">
        <Icon size={20} type="close" />
      </Button>
      <Button type="frame">
        <Icon size={18} type="save" />
        保存
      </Button>
      <Button disabled>
        <Icon size={16} type="trash" />
        删除
      </Button>
    </>
  );
};
customize.story = {
  name: '自定义内容',
  // decorators:[(fn:any) => <div style={{justifyContent:'flex-start'}}>{fn()}</div>]
};
