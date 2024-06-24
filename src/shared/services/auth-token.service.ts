import Cookie from 'js-cookie';

import { EnumTokens } from '../enum/tokens.enum';

/** Сервис для работы с токенами */
class AuthTokensService {
	/** Получить токен */
	public getAccessToken = () => {
		const accessToken = Cookie.get(EnumTokens.ACCESS_TOKEN);

		return accessToken || null;
	};

	/** Сохранить токен */
	public saveTokenStorage = (accessToken: string) => {
		Cookie.set(EnumTokens.ACCESS_TOKEN, accessToken, {
			domain: 'localhost',
			sameSite: 'strict',
			expires: 1
		});
	};

	/** Удалить токен */
	public removeFromStorage = () => {
		Cookie.remove(EnumTokens.ACCESS_TOKEN);
	};
}

export const authTokens = new AuthTokensService();
