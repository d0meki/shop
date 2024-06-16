import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth.status.enum';
import { loginAction } from '../actions/login.action';
import { useLocalStorage } from '@vueuse/core';
import { registerAction } from '../actions/register.action';
import { checkAuthAction } from '../actions/check-auth.action';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Cheking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password);
      if (!loginResp.ok) {
        console.error(loginResp.message);
        logOut();
        return false;
      }
      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.error(error);
      logOut();
    }
  };
  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResp = await registerAction(fullName, email, password);
      if (!registerResp.ok) {
        console.error(registerResp.message);
        logOut();
        return { ok: false, message: registerResp.message };
      }
      user.value = registerResp.user;
      token.value = registerResp.token;
      authStatus.value = AuthStatus.Authenticated;
      return { ok: true, message: 'Usuario creado correctamente' };
    } catch (error) {
      console.error(error);
      logOut();
      return { ok: false, message: 'No se pudo crear el usuario' };
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();
      if (!statusResp.ok) {
        logOut();
        return false;
      }
      authStatus.value = AuthStatus.Authenticated;
      user.value = statusResp.user;
      token.value = statusResp.token;
      return true;
    } catch (error) {
      logOut();
      return false;
    }
  };

  const logOut = () => {
    authStatus.value = AuthStatus.UnAuthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  return {
    user,
    token,
    authStatus,
    // Getters

    isChecking: computed(() => authStatus.value === AuthStatus.Cheking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isAdmin: computed(() => user.value?.roles.includes('admin') ?? false),
    username: computed(() => user.value?.fullName),

    // Actions
    login,
    register,
    checkAuthStatus,
    logOut,
  };
});
