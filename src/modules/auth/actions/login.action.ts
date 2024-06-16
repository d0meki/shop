import { tesloApi } from '@/api/teloApi';
import type { AuthResponse } from '../interfaces/auth.response';
import type { User } from '../interfaces/user.interface';
import { isAxiosError } from 'axios';

interface LoginError {
  ok: false;
  message: string;
}

interface LoginSuccess {
  ok: true;
  user: User;
  token: string;
}

export const loginAction = async (
  emaila: string,
  passwors: string,
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
      email: emaila,
      password: passwors,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'Credenciales incorrectas',
      };
    }
    console.log(error);
    throw new Error('No se pudo realizar la petición');
  }
};
