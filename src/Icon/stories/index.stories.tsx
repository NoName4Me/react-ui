import React from 'react';
import Icon from '..';

export default {
  title: 'Story|Icon',
};

const LabelBox = ({ type, children }: any) => {
  const handleCopy = () => {};
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '5px',
        paddingBottom: '5px',
        border: '1px solid lightgray',
      }}
    >
      <span
        style={{ textAlign: 'center', padding: '4px 8px', marginBottom: '5px', backgroundColor: 'lightgrey' }}
        onDoubleClick={handleCopy}
      >
        {type}
      </span>
      {children}
    </div>
  );
};

export const base = () => {
  return (
    <>
      {['trash', 'save', 'close', 'search', 'check', 'chevron-down', 'chevron-up', 'times'].map((type, idx) => (
        <LabelBox key={idx} type={type}>
          <Icon type={type} size={24} />
        </LabelBox>
      ))}
    </>
  );
};
base.story = {
  name: '基础',
};

export const disable = () => {
  return (
    <>
      <Icon type="trash" size={24} extraCls="DiyIconStyle" onClick={() => alert('hi')} />
    </>
  );
};
disable.story = {
  name: '禁用',
};
