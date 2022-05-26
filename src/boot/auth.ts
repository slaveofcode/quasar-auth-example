import { Cookies } from 'quasar';
import { boot } from 'quasar/wrappers';
import { useStore as useAppStore } from 'stores/app';

export default boot(({ ssrContext, store }) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const appStore = useAppStore(store);
  const token = cookies.get('tada-admin-token');

  if (token) {
    // TODO: do check token to server here
    appStore.setLoggedIn(true);
  }
});
