import React from 'react';
import './index.scss';

type DemoContainerProps = {
  children: React.ReactNode;
  title: string;
  desc: React.ReactNode;
};

export default function DemoContainer(props: DemoContainerProps) {
  const { children, desc, title } = props;
  return (
    <div className="DemoContainer">
      <div>{title}</div>
      <div>{desc}</div>
      <div>{children}</div>
    </div>
  );
}
