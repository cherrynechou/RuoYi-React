import { defineConfig } from '@umijs/max';
import { join } from 'node:path';

import proxy from './proxy';
import routes from './routes';
import defaultSettings from './defaultSettings';

const { REACT_APP_ENV } = process.env;

/**
 * @name 使用公共路径
 * @description 部署时的路径，如果部署在非根目录下，需要配置这个变量
 * @doc https://umijs.org/docs/api/config#publicpath
 */
const PUBLIC_PATH: string = process.env.ELECTRON_BUILD === 'true' ? './' : '/';

export default defineConfig({

  //history: { type: 'hash' },//新增

  publicPath: PUBLIC_PATH,//新增

  /**
   * @name 路由的配置，不在路由中引入的文件不会编译
   * @description 只支持 path，component，routes，redirect，wrappers，title 的配置
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,

  /**
   * @name 主题的配置
   * @description 虽然叫主题，但是其实只是 less 的变量设置
   * @doc antd的主题设置 https://ant.design/docs/react/customize-theme-cn
   * @doc umi 的theme 配置 https://umijs.org/docs/api/config#theme
   */
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    'root-entry-name': 'variable',
  },

  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],

  /**
   * @name 快速热更新配置
   * @description 一个不错的热更新组件，更新时可以保留 state
   */
  fastRefresh: true,

  /**
   * @name 数据流插件
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},

  /**
   * 一个全局的初始数据流，可以用它在插件之间共享数据
   * @description 可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},

  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },

  /**
   * @name moment2dayjs 插件
   * @description 将项目中的 moment 替换为 dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },

  locale: {
    antd: true, // 如果项目依赖中包含 `antd`，则默认为 true
    baseNavigator: true,
    baseSeparator: '-',
    default: 'zh-CN',
    title: false,
    useLocalStorage: true,
  },

  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},

  request: {},

  /**
   * @name 权限插件
   * @description 基于 initialState 的权限插件，必须先打开 initialState
   * @doc https://umijs.org/docs/max/access
   */
  access: {},

  /**
   * @name <head> 中额外的 script
   * @description 配置 <head> 中额外的 script
   */
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: join(PUBLIC_PATH, 'scripts/loading.js'), async: true },
  ],

  verifyCommit: {
    scope: ['dev', 'fix'],
  },


  npmClient: 'pnpm',
});

