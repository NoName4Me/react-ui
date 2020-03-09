import React from 'react';
import NotificationManager, { Notification, Placement } from '../index';
import { NotificationType } from '../Notification';
import Button from '../../Button';

export default {
  title: 'Story|Notification',
};

export const base = () => {
  return (
    <>
      {['error', 'warn', 'success', 'info', 'hint', 'plain'].map((type, idx) => {
        return (
          <Notification
            key={type}
            style={{ marginTop: '10px' }}
            closable={idx % 2 === 0}
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
export const api = () => {
  return (
    <>
      <FlexLine>
        {['left-top', 'center-top', 'right-top'].map(placement => {
          return (
            <Button
              key={placement}
              onClick={() =>
                NotificationManager.info({
                  title: placement,
                  placement,
                  content: `A notification @${placement}: ${Date.now()}`,
                  autoDismiss: false,
                })
              }
            >
              {placement}
            </Button>
          );
        })}
      </FlexLine>
      <FlexLine>
        {['left-bottom', 'center-bottom', 'right-bottom'].map(placement => {
          return (
            <Button
              key={placement}
              onClick={() =>
                NotificationManager.info({
                  title: placement,
                  placement,
                  content: `A notification @${placement}: ${Date.now()}`,
                })
              }
            >
              {placement}
            </Button>
          );
        })}
      </FlexLine>
    </>
  );
};

api.story = {
  name: '通过 api 调用',
};
