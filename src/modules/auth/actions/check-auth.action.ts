import { tesloApi } from '@/api/teloApi';
import type { User } from '../interfaces/user.interface';
import type { AuthResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';
interface CheckError {
  ok: false;
}

interface CheckSuccess {
  ok: true;
  user: User;
  token: string;
}
export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken.length < 10) {
      return { ok: false };
    }
    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
    console.log(data);

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return { ok: false };
    }
    throw new Error('Error al verificar el estado de autenticación');
  }
};
