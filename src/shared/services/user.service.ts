import { axiosWithAuth } from '@/api/interceptors';

import { IProfileResponse } from '../interfaces/proifle.interface';
import { TypeUserForm } from '../types/user.type';

/** Сервис для работы с профилем пользователя */
class UserService {
	private BASE_URL = '/user/profile';

	/** Получить информацию о профиле */
	public async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(this.BASE_URL);
		return response.data;
	}

	/** Обновить профильЫ */
	public async update(data: TypeUserForm) {
		const response = await axiosWithAuth.put(this.BASE_URL, data);
		return response.data;
	}
}

export const userService = new UserService();
