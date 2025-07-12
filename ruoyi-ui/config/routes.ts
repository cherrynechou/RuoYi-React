export default [
  {
    path: '/admin',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/admin/login',
        component: './Admin/Login',
      },
      {
        component: './Exception/404',
      },
    ],
  }, {
    path: '/auth',
    name: 'auth',
    icon: 'WindowsOutlined',
    routes: [
      {
        path: '/auth/users',
        name: 'user',
        component: './Auth/User',
      },
      {
        path: '/auth/menu',
        name: 'menu',
        component: './Auth/Menu',
      },
      {
        path: '/auth/permissions',
        name: 'permission',
        component: './Auth/Permission',
      },
      {
        path: '/auth/roles',
        name: 'role',
        component: './Auth/Role',
      },
    ],
  }, {
    path: '/data',
    name: 'data',
    icon: 'SettingOutlined',
    routes: [
      {
        path: '/data/config',
        name: 'config',
        component: './Data/Config',
      },
      {
        path: '/data/dict',
        name: 'dict',
        component: './Data/Dict',
      },
    ],
  }, {
    path: '/',
    redirect: '/dashboard/analysis',
  }, {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'DashboardOutlined',
    routes: [
      {
        path: '/dashboard/analysis',
        name: 'analysis',
        component: './Dashboard/Analysis',
      },
    ],
  }, {
    path: '/error/403',
    component: './Exception/403',
    hidden: true,
  }, {
    path: '/*',
    layout: false,
    component: './Exception/404',
  },
];