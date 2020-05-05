import React, { useState } from 'react';
import Popover, { StaticPopover } from '../index';
import Button from '../../Button';
import Popper from '@material-ui/core/Popper';
import { default as MuiPopover } from '@material-ui/core/Popover';


export default {
  title: 'Story|Popover',
};

export const base = () => {
  const PopContent = <div style={{ padding: '10px', border: '1px solid' }}>Popover~</div>;

  return (
    <div>
      <Popover PopContent={PopContent}>
        <Button>hover 展示 Popover</Button>
      </Popover>
      <Popover PopContent={PopContent} showWhen="click">
        <Button style={{ marginLeft: '20px' }} onClick={() => console.log('button click')}>
          click 展示 Popover
        </Button>
      </Popover>
    </div>
  );
};

base.story = {
  name: '基础',
};

export const trigger = () => {
  const [trigger, setTrigger] = useState();
  const handleClick = (event) => {
    setTrigger(trigger ? null : event.currentTarget);
  };

  const handleMouseEnter = (event) => {
    setTrigger(event.currentTarget);
  };

  const handleMouseLeave = (event) => {
    setTrigger(null);
  };

  return (
    <div>
      <div style={{ height: '200px', overflow: 'auto' }}>
        <div style={{ height: '800px' }}>
          <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            hover 展示 Popover
          </Button>
          <Button onClick={handleClick} style={{ marginLeft: '20px' }}>
            click 展示 Popover
          </Button>
          <StaticPopover trigger={trigger}>
        <div style={{ padding: '10px', border: '1px solid' }}>Popover</div>
      </StaticPopover>

          {/* <MuiPopover open={trigger} anchorEl={trigger}>
            <div style={{ padding: '10px', border: '1px solid' }}>The content of the Popper.</div>
          </MuiPopover> */}
          {/* <Popper open={trigger} anchorEl={trigger}>
            <div style={{ padding: '10px', border: '1px solid' }}>The content of the Popper.</div>
          </Popper> */}
        </div>
      </div>
    </div>
  );
};

trigger.story = {
  name: '指定 trigger 的方式',
};

export const scroll = () => {
  const PopContent = <div style={{ padding: '10px', border: '1px solid' }}>Popover~</div>;

  return (
    <div style={{ height: '200px', overflow: 'auto' }}>
      <div style={{ height: '800px' }}>
        <Popover PopContent={PopContent} showWhen="click" disableScroll>
          <Button style={{ marginLeft: '20px' }} onClick={() => console.log('button click')}>
            滚动禁用
          </Button>
        </Popover>
        <Popover PopContent={PopContent} showWhen="click">
          <Button style={{ marginLeft: '20px' }} onClick={() => console.log('button click')}>
            滚动跟随
          </Button>
        </Popover>
      </div>
    </div>
  );
};

scroll.story = {
  name: '滚动禁用/跟随',
};
