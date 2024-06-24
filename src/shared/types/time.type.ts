import { ITimeBlockResponse } from '../interfaces/time-block.interface';

export type TypeTimeBlockFormState = Partial<
	Omit<ITimeBlockResponse, 'createdAt' | 'updatedAt'>
>;
