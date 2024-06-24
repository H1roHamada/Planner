import axios, { type CreateAxiosDefaults } from 'axios';

import { errorCatch } from './error-catch';
import { authTokens } from '@/shared/services/auth-token.service';
import { authService } from '@/shared/services/auth.service';

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:5000/api',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
};

const axiosClassic = axios.create(options);

const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = authTokens.getAccessToken();

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (
			error?.response?.status === 401 ||
			errorCatch(error) === 'jwt expired' ||
			(errorCatch(error) === 'jwt must be provider' &&
				error.config &&
				!error.config._isRetry)
		) {
			originalRequest._isRetry = true;

			try {
				await authService.getNewTokens();
				return axiosWithAuth.request(originalRequest);
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') authTokens.removeFromStorage();
			}
		}

		throw error;
	}
);

export { axiosClassic, axiosWithAuth };
