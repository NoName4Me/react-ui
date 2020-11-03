import React, { useState } from 'react';
import Input from '../index';
import Icon from '../../Icon';

export default {
  title: 'Story/Input',
};

export const base = () => {
  const [val, setVal] = useState('');
  return (
    <>
      <Input style={{ marginRight: '10px' }} value={val} onChange={(val) => setVal(val)} clearable />
      <Input
        style={{ marginRight: '10px' }}
        value={val}
        clearable={false}
        placeholder="不展示清空按钮"
        onChange={(val) => setVal(val)}
      />
      <Input style={{ marginRight: '10px' }} value={val} onChange={(val) => setVal(val)} underlined clearable />
      <Input
        style={{ marginRight: '10px' }}
        value={val}
        clearable={false}
        placeholder="不展示清空按钮"
        underlined
        onChange={(val) => setVal(val)}
      />
    </>
  );
};
base.story = {
  decorators: [(fn: any) => <div style={{ display: 'flex' }}>{fn()}</div>],
};

export const state = () => {
  const [val, setVal] = useState('');
  return (
    <>
      <div style={{ display: 'flex' }}>
        <Input
          value={val}
          style={{ marginRight: '10px' }}
          placeholder="请输入一个值哦"
          onChange={(val) => setVal(val)}
        />
        <Input
          value={val}
          disabled
          style={{ marginRight: '10px' }}
          placeholder="disabled Input"
          onChange={(val) => setVal(val)}
        />
        <Input value={val} readonly placeholder="readonly Input" onChange={(val) => setVal(val)} />
      </div>
      <div style={{ display: 'flex', margin: '20px 0' }}>
        <Input value={val} style={{ marginRight: '10px' }} underlined onChange={(val) => setVal(val)} />
        <Input
          value={val}
          disabled
          underlined
          style={{ marginRight: '10px' }}
          placeholder="disabled Input"
          onChange={(val) => setVal(val)}
        />
        <Input value={val} readonly underlined placeholder="readonly Input" onChange={(val) => setVal(val)} />
      </div>
    </>
  );
};

state.story = {
  name: '各种状态',
};

export const suffix = () => {
  const [val, setVal] = useState('');
  const suffix = <Icon type="search" color="lightgray" size={12} style={{ marginRight: '5px' }} />;
  return <Input value={val} clearable suffix={suffix} onChange={(val) => setVal(val)} />;
};
suffix.story = {
  name: '下划线样式',
};
