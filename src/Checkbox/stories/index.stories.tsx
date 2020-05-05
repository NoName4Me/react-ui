import React, { useState } from 'react';
import CheckboxGroup, { Checkbox } from '../index';

export default {
  title: 'Story|Checkbox',
};

export const base = () => {
  return <Checkbox label="a checkbox" checked value="hi" />;
};

base.story = {
  name: '基础',
};

const DemoItem = ({ children }: any) => {
  return <div style={{ width: '200px', display: 'inline-flex', justifyContent: 'space-around' }}>{children}</div>;
};
export const state = () => {
  return (
    <>
      <DemoItem>
        <Checkbox label="未选" checked={false} />
        <Checkbox label="未选禁用" disabled />
      </DemoItem>
      <DemoItem>
        <Checkbox label="已选" checked />
        <Checkbox label="已选禁用" checked disabled />
      </DemoItem>
      <DemoItem>
        <Checkbox label="部分选择" indeterminate checked={false} />
        <Checkbox label="部分选择禁用" indeterminate disabled />
      </DemoItem>
    </>
  );
};

base.story = {
  name: '状态',
};

export const group = () => {
  const options = Array(6)
    .fill(null)
    .map((_, idx) => ({ label: '选项' + (idx + 1), value: idx })); // , disabled: Math.random() > 0.5
  const handleChange = (val: any[], indeterminate: boolean) => {
    setSelected(val);
    setIndeterminate(indeterminate);
  };
  const [indeterminate, setIndeterminate] = useState(true);
  const [selected, setSelected] = useState([2, 4]);
  return (
    <>
      <Checkbox
        label="全选"
        indeterminate={indeterminate}
        checked={selected.length === options.length}
        onChange={(checked) => {
          setSelected(checked ? options.map((item) => item.value) : []);
          setIndeterminate(false);
        }}
      />
      <br />
      <CheckboxGroup options={options} onChange={handleChange} value={selected} />
    </>
  );
};

group.story = {
  name: '复选组',
};
