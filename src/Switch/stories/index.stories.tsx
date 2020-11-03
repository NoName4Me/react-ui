import React, { useState } from 'react';
import Switch from '../index';

export default {
  title: 'Story/Switch',
};

export const base = () => {
  const [state, setState] = useState(true);
  const handleChange = () => {
    setState(!state);
  };
  return (
    <div style={{ display: 'flex', width: '300px', justifyContent: 'space-around' }}>
      <Switch value={state} title="一个大号的 switch" onChange={handleChange} />
      <Switch value={state} round onChange={handleChange} />
      <Switch value={state} small onChange={handleChange} />
      <Switch value={state} small round onChange={handleChange} />
    </div>
  );
};

base.story = {
  name: '基础',
};

export const disabled = () => {
  return (
    <div style={{ display: 'flex', width: '500px', justifyContent: 'space-around' }}>
      <Switch value disabled />
      <Switch value round disabled />
      <Switch value small disabled />
      <Switch value small round disabled />
      <Switch disabled />
      <Switch round disabled />
      <Switch small disabled />
      <Switch small round disabled />
    </div>
  );
};

disabled.story = {
  name: '禁用',
};
