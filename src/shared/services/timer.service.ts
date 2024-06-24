import { axiosWithAuth } from '@/api/interceptors';

import { ITimerSessionResponse } from '../interfaces/timer.interface';
import {
	TypeTimerRoundState,
	TypeTimerSessionState
} from '../types/timer.types';

/** Сервис для работы с таймером */
class TimerService {
	private BASE_URL = '/user/timer';

	/** Получить сегодняшние сессии */
	public async getTodaySession() {
		return await axiosWithAuth.get<ITimerSessionResponse>(
			`${this.BASE_URL}/today`
		);
	}

	/** Создать сессию */
	public async createSession() {
		return await axiosWithAuth.post<ITimerSessionResponse>(this.BASE_URL);
	}

	/** Обновить сессию */
	public async updateSession(id: string, data: TypeTimerSessionState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
	}

	/** Удалить сессию */
	public async deleteSession(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
	}

	/** Обновить круг в сессии */
	public async updateRound(id: string, data: TypeTimerRoundState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/round/${id}`, data);
	}
}

export const timerService = new TimerService();
