import React from 'react';
import Tooltip from '../index';
import Button from '../../Button';
import { Placement } from '../Tooltip';

export default {
  title: 'Story|Tooltip',
};

const content = 'Tooltip~';

export const base = () => {
  return (
    <div style={{ width: '500px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {['top-start', 'top', 'top-end'].map((placement) => (
          <Tooltip key={placement} content={content} placement={placement as Placement}>
            <Button size="big" type="text">
              {placement.toUpperCase()}
            </Button>
          </Tooltip>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {['left-start', 'left', 'left-end'].map((placement) => (
            <Tooltip key={placement} content={content} placement={placement as Placement}>
              <Button size="big" type="text">
                {placement.toUpperCase()}
              </Button>
            </Tooltip>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {['right-start', 'right', 'right-end'].map((placement) => (
            <Tooltip key={placement} content={content} placement={placement as Placement}>
              <Button size="big" type="text">
                {placement.toUpperCase()}
              </Button>
            </Tooltip>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {['bottom-start', 'bottom', 'bottom-end'].map((placement) => (
          <Tooltip key={placement} content={content} placement={placement as Placement}>
            <Button size="big" type="text">
              {placement.toUpperCase()}
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

base.story = {
  name: '基础',
};

export const arrow = () => {
  return (
    <>
      <Tooltip content="Tooltip~" isShowArrow={false}>
        <span>without arrow</span>
      </Tooltip>
      <Tooltip content="Tooltip~">
        <span style={{ marginLeft: '40px' }}>arrow</span>
      </Tooltip>
    </>
  );
};
arrow.story = {
  name: '箭头',
};

export const interactive = () => {
  return (
    <Tooltip interactive content="设置一定的延迟可以让">
      <span>hover me</span>
    </Tooltip>
  );
};
interactive.story = {
  name: '可交互',
};

export const maxWidth = () => {
  return (
    <>
      <Tooltip content="默认最大宽度 400px，超过时会折行显示。默认最大宽度 400px，超过时会折行显示。默认最大宽度 400px，超过时会折行显示。">
        <span>默认最大宽度、折行</span>
      </Tooltip>
      <Tooltip content="Default max-width is 400px, text overflowed will be wrapped. Default max-width is 400px, text overflowed will be wrapped. Default max-width is 400px, text overflowed will be wrapped.">
        <span style={{ marginLeft: '40px' }}>default max-width</span>
      </Tooltip>
    </>
  );
};
maxWidth.story = {
  name: '基础',
};
