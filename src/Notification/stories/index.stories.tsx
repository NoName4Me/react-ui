import React, { useState } from 'react';
import NotificationManager, { Notification, Placement } from '../index';
import { NotificationType } from '../Notification';
import Button from '../../Button';

export default {
  title: 'Story|Notification',
};

export const base = () => {
  return (
    <>
      {['error', 'warn', 'success', 'info', 'plain', 'hint'].map((type, idx) => {
        return (
          <Notification
            key={type}
            style={{ marginTop: '10px' }}
            showClose={idx % 2 === 0}
            type={type as NotificationType}
            title={type}
          >
            Notification
          </Notification>
        );
      })}
    </>
  );
};

base.story = {
  name: '基础',
};

const FlexLine = ({ children }: any) => {
  return (
    <div style={{ width: '400px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      {children}
    </div>
  );
};

function getRandomType() {
  const types = ['error', 'warn', 'success', 'info', 'hint', 'plain'];
  return types[Math.floor(Math.random() * types.length)];
}
export const api = () => {
  const [id, setId] = useState(null);
  return (
    <>
      {[
        ['left-top', 'center-top', 'right-top'],
        ['left-bottom', 'center-bottom', 'right-bottom'],
      ].map((list, idx) => (
        <FlexLine key={idx}>
          {list.map((placement) => {
            return (
              <Button
                key={placement}
                onClick={() =>
                  NotificationManager[getRandomType()]({
                    title: placement,
                    placement,
                    content: `A notification @${placement}: ${Date.now()}`,
                    showClose: Math.random() > 0.8,
                  })
                }
              >
                {placement}
              </Button>
            );
          })}
        </FlexLine>
      ))}
      <Button
        onClick={() => {
          setId(NotificationManager.error('💩 thing happened.'));
        }}
      >
        发一个消息，然后通过 id 关闭👉
      </Button>
      {id && (
        <Button
          onClick={() => {
            NotificationManager.remove(id);
            setId(null);
          }}
        >
          点击关闭该消息
        </Button>
      )}
    </>
  );
};

api.story = {
  name: '通过 api 调用',
};
