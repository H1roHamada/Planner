import { axiosWithAuth } from '@/api/interceptors';

import { ITaskResponse } from '../interfaces/task.interface';
import { TypeTaskForm } from '../types/task.type';

/** Сервис для работы со списком задач */
class TaskService {
	private BASE_URL = 'user/tasks';

	/** Получить список задач */
	public async getTasks() {
		return await axiosWithAuth.get<ITaskResponse[]>(this.BASE_URL);
	}

	/** Создать задачу */
	public async createTask(data: TypeTaskForm) {
		return await axiosWithAuth.post(`${this.BASE_URL}`, data);
	}

	/** Обновить задачу */
	public async updateTask(id: string, data: TypeTaskForm) {
		return await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
	}

	/** Удалить задачу */
	public async deleteTask(id: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
	}
}
export const taskService = new TaskService();
