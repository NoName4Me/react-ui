import { create } from '@storybook/theming/create';
import logo from './assets/images/cybereact-with-word.svg';
export default create({
  base: 'dark',

  colorPrimary: '#02F8FF',
  colorSecondary: '#02F8FFAA',

  // UI
  appBg: '#05122D',
  appContentBg: '#05122D',
  appBorderColor: '#E8E9EA22',
  appBorderRadius: 4,

  // Typography
  fontBase: '"ZCOOL XiaoWei", serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#E8E9EA',
  textInverseColor: '#05122D',

  // Toolbar default and active colors
  barTextColor: '#E8E9EA',
  barSelectedColor: '#02F8FF',
  barBg: '#02F8FF22',

  // Form colors
  inputBg: '#05122D',
  inputBorder: 'yellow',
  inputTextColor: '#E8E9EA',
  inputBorderRadius: 4,

  brandTitle: 'Cyber React UI',
  brandUrl: 'https://example.com',
  brandImage: logo,
});
