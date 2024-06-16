<template>

  <FullScreenLoader v-if="authStore.isChecking" />
  <RouterView v-else />
  <!-- <RouterView /> -->
  <VueQueryDevtools />
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from './modules/auth/stores/auth.store';
import FullScreenLoader from './modules/common/components/FullScreenLoader.vue';
import { AuthStatus } from './modules/auth/interfaces/auth.status.enum';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

authStore.$subscribe((_, state) => {
  if (state.authStatus === AuthStatus.Cheking) {
    authStore.checkAuthStatus();
    return;
  }
  if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
    router.replace({ name: 'home' });
    return;
  }
},
  {
    immediate: true
  }
);



</script>