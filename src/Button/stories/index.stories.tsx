import React from 'react';
import Button from '..';
import Icon from '../../Icon';

export default {
  title: 'Story/Button',
};

const Group = ({ children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '500px', margin: '10px' }}>{children}</div>
  );
};

export const base = () => {
  return (
    <>
      <Group>
        <Button size="large">大号主要按钮</Button>
        <Button size="large" type="frame">
          大号次要按钮
        </Button>
        <Button size="large" type="text">
          大号文字按钮
        </Button>
      </Group>
      <Group>
        <Button>普通主要按钮</Button>
        <Button type="frame">普通次要按钮</Button>
        <Button type="text">普通文字按钮</Button>
      </Group>
      <Group>
        <Button size="small">小号主要按钮</Button>
        <Button size="small" type="frame">
          小号次要按钮
        </Button>
        <Button size="small" type="text">
          小号文字按钮
        </Button>
      </Group>
    </>
  );
};
base.story = {
  name: '基础',
};

export const disable = () => {
  return (
    <Group>
      <Button disabled>主要按钮</Button>
      <Button disabled type="frame">
        次要按钮
      </Button>
      <Button disabled type="text">
        文字按钮
      </Button>
    </Group>
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
