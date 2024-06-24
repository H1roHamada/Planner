import { ITaskResponse } from '../interfaces/task.interface';

export type TypeTaskForm = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>;
