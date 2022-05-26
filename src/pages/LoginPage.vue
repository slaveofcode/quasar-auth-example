<template>
  <q-page :style-fn="makeFullHeight">
    <div class="row justify-center items-center" style="height: 100%">
      <div class="q-pa-md" style="max-width: 600px">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="username"
            label="Username *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            type="password"
            v-model="password"
            label="Password *"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') || 'Please type your password',
            ]"
          />

          <div>
            <q-btn label="Login" type="submit" color="primary" />
          </div>
        </q-form>
      </div></div
  ></q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore as useAppStore } from 'stores/app';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const usernameVal = ref('');
    const passwordVal = ref('');

    return {
      appStore: useAppStore(),
      router: useRouter(),
      username: usernameVal,
      password: passwordVal,
    };
  },
  methods: {
    makeFullHeight(offset: number) {
      return {
        minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh',
      };
    },
    onSubmit() {
      if (this.username === 'aditya' && this.password === 'kresna') {
        this.appStore.setLoggedIn(true);
        this.$q.cookies.set('tada-admin-token', 'foobar');
        this.router.push({ name: 'dashboard' });
      } else {
        this.$q.dialog({
          title: 'Invalid Auth',
          message: 'Please provide a valid username & password!',
        });
      }
    },
  },
});
</script>
