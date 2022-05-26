<template>
  <q-page padding>
    <q-page-container>
      <p>Logging out...</p>
    </q-page-container>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore as useAppStore } from 'stores/app';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LogoutPage',
  setup() {
    return {
      appStore: useAppStore(),
      router: useRouter(),
    };
  },
  mounted() {
    this.appStore.setLoggedIn(false);
    this.$q.cookies.remove('tada-admin-token');
    this.router.push({ name: 'login' });
  },
});
</script>
