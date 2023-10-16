export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/home',
    code: 'home',
    name: 'home',
    icon: 'dashboard',
    component: './Welcome',
  },
  {
    path: '/system',
    code: 'system',
    name: 'system',
    icon: 'setting',
    routes: [
      {
        path: '/system',
        redirect: '/system/menu',
      },
      {
        path: '/system/menu',
        code: 'menu',
        name: 'system.menu',
        component: './system/Menu',
      },
      {
        path: '/system/role',
        code: 'role',
        name: 'system.role',
        component: './system/Role',
      },
      {
        path: '/system/user',
        code: 'user',
        name: 'system.user',
        component: './system/User',
      },
    ],
  },
  {
    path: '/account/center',
    name: 'account.center',
    component: './user/Profile',
    hideInMenu: true,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    component: './404',
  },
];
