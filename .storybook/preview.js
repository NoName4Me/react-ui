import React from 'react';
import { addParameters, addDecorator } from '@storybook/react';
import theme from './theme';
// addDecorator((storyFn) => <div style={{ display: 'flex', justifyContent: 'space-around' }}>{storyFn()}</div>);
addParameters({ options: { theme } });
