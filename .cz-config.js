'use strict';

module.exports = {
  types: [
    { value: 'feat', name: 'feat:     新特性' },
    { value: 'fix', name: 'fix:      bug 修复' },
    { value: 'docs', name: 'docs:     文档相关' },
    { value: 'style', name: 'style:    格式等无关代码意义的修改' },
    { value: 'refactor', name: 'refactor: 重构' },
    { value: 'perf', name: 'perf:     性能提升' },
    { value: 'test', name: 'test:     增加测试用例' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'WIP', name: 'WIP:      还在开发，待续' },
  ],

  scopes: [{ name: '公共' }, { name: '模块1' }, { name: '模块2' }],

  // it needs to match the value for field type. Eg.: 'fix'
  /*
  scopeOverrides: {
    fix: [
      {name: 'merge'},
      {name: 'style'},
      {name: 'e2eTest'},
      {name: 'unitTest'}
    ]
  },
  //*/
  // override the messages, defaults are as follows
  messages: {
    type: '请选择本次提交的类型:',
    scope: '\n选择本次修改的模块:',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: '本次修改简要说明:\n',
    body: '详细说明，用 "|" 来表示换行(非必填):\n',
    breaking: '重大改动点(非必填):\n',
    footer: '本次提交需要关闭的 issue(非必填)，比如: #31, #34:\n',
    confirmCommit: '确认以上信息咩 ^__^?',
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix', 'refactor'],

  // limit subject length
  subjectLimit: 100,
};
