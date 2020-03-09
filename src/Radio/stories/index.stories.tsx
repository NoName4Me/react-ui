import React, { useState } from 'react';
import RadioGroup, { Radio } from '..';

export default {
  title: 'Story|Radio',
};

export const base = () => {
  const [state, setstate] = useState('2');
  return (
    <RadioGroup
      style={{ width: '200px' }}
      value={state}
      onChange={(val: any) => {
        setstate(val);
      }}
    >
      <Radio label="radio 1" value="1" />
      <Radio label="radio 2" value="2" />
    </RadioGroup>
  );
};

base.story = {
  name: '基本',
};

export const options = () => {
  const options = [
    { label: '男', value: '0' },
    { label: '女', value: '1' },
    { label: '保密', value: '2' },
  ];

  const [state, setstate] = useState(options[0].value);
  return (
    <>
      <RadioGroup
        style={{ width: '200px' }}
        value={state}
        onChange={(val: any) => {
          setstate(val);
        }}
        options={options}
      ></RadioGroup>
      <RadioGroup
        style={{ width: '200px' }}
        value={state}
        options={options}
        onChange={(val: any) => {
          setstate(val);
        }}
      >
        <Radio label="radio 1" value="1" />
        <Radio label="radio 2" value="2" />
      </RadioGroup>
    </>
  );
};

export const disabled = () => {
  const options = [
    { label: '禁用1', value: '0', disabled: true },
    { label: '正常', value: '1' },
    { label: '禁用2', value: '2', disabled: true },
  ];
  const [state, setstate] = useState('0');
  return (
    <>
      <Radio disabled label="禁用未选" />
      <Radio disabled checked label="禁用已选" />
      <RadioGroup
        style={{ width: '200px', marginLeft: '100px' }}
        options={options}
        value={state}
        onChange={(val: any) => {
          setstate(val);
        }}
      ></RadioGroup>
      <RadioGroup
        style={{ width: '200px', marginLeft: '100px' }}
        disabled
        options={options}
        value={state}
        onChange={(val: any) => {
          setstate(val);
        }}
      ></RadioGroup>
    </>
  );
};

disabled.story = {
  name: '禁用',
};
