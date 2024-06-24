import { axiosClassic } from '@/api/interceptors';

import { IAuthForm, IAuthResponse } from '../interfaces/auth.interface';

import { authTokens } from './auth-token.service';

/** Сервис для работы с авторизацией */
class AuthService {
	/** Авторизация / Регистрация */
	public async main(type: 'login ' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		);

		if (response.data.accessToken) {
			authTokens.saveTokenStorage(response.data.accessToken);
		}

		return response;
	}

	/** Получить новый токен */
	public async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		);

		if (response.data.accessToken) {
			authTokens.saveTokenStorage(response.data.accessToken);
		}

		return response;
	}

	/** Выход из аккаунта */
	public async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout');

		if (response.data) {
			authTokens.removeFromStorage();
		}

		return response;
	}
}

export const authService = new AuthService();
