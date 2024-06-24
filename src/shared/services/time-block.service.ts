import { axiosWithAuth } from '@/api/interceptors';

import { ITimeBlockResponse } from '../interfaces/time-block.interface';
import { TypeTimeBlockFormState } from '../types/time.type';

/** Сервис для работы с временными блоками */
class TimeBlockService {
	private BASE_URL = '/user/time-blocks';

	/** Получить все временные блоки */
	public async getTimeBlocks() {
		return await axiosWithAuth.get<ITimeBlockResponse[]>(this.BASE_URL);
	}

	/** Создать временный блок*/
	public async createTimeBlock(data: TypeTimeBlockFormState) {
		return await axiosWithAuth.post(this.BASE_URL, data);
	}

	/** Обновить последовательность временных блоков*/
	public async updateOrderTimeBlock(ids: string[]) {
		return await axiosWithAuth.put(`${this.BASE_URL}/update-order`, { ids });
	}

	/** Обновить временный блок */
	public async updateTimeBlock(id: string, data: TypeTimeBlockFormState) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
	}

	/** Удалить временный блок */
	public async deleteTimeBlock(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
	}
}

export const timeBlockService = new TimeBlockService();
