export const routes = [
  { name: 'home', path: '/', component: 'v-home', exact: true },
  { name: 'info', path: '/info', children: [
    { name: 'list', path: '/list' },
    { name: 'table', path: '/table' },
    { name: 'form', path: '/form' },
  ] },
  { name: 'profile', path: '/profile', component: 'v-profile' },
  { name: 'none', component: 'v-none' },
]
