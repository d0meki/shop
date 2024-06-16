import { tesloApi } from '@/api/teloApi';
import type { User } from '../interfaces/user.interface';
import type { AuthResponse } from '../interfaces/auth.response';
import { isAxiosError } from 'axios';

interface RegisterError {
  ok: false;
  message: string;
}

interface RegisterSuccess {
  ok: true;
  user: User;
  token: string;
}
export const registerAction = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterError | RegisterSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName: fullName,
      email: email,
      password: password,
    });

    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo crear el usuario',
    };
  }
};
