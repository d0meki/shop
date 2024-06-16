import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const isAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const useStore = useAuthStore();

  await useStore.checkAuthStatus();

  if (!useStore.isAdmin) {
    console.log('No eres admin');

    return next({ name: 'home' });
  }
  console.log('Eres admin');

  return next();
};

export default isAdminGuard;
