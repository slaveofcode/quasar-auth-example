import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import { useStore as useAppStore } from 'stores/app';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Router.beforeEach(async (to, from) => {
    const appStore = useAppStore(store);

    if (
      to.matched.some((routeItem) => routeItem.meta.requiresAuth) &&
      !appStore.isAuthenticated
    ) {
      // prevent unauthenticated user access privilege pages
      return {
        name: 'login',
      };
    }

    if (
      to.matched.some((routeItem) => routeItem.meta.onlyIfUnauthenticated) &&
      appStore.isAuthenticated
    ) {
      return {
        name: 'dashboard',
      };
    }
  });

  return Router;
});
