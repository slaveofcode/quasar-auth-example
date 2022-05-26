import { defineStore } from 'pinia';

export const useStore = defineStore('app', {
  state: () => ({
    isAuthenticated: false,
    token: null,
    accountInfo: {},
    isDarkMode: false,
  }),
  actions: {
    setDarkMode(val: boolean) {
      this.isDarkMode = val;
    },
    setLoggedIn(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
    },
  },
  getters: {
    atDarkMode(): boolean {
      return this.isDarkMode;
    },
  },
});
