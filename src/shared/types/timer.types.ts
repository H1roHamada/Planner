import {
	ITimerRoundResponse,
	ITimerSessionResponse
} from '../interfaces/timer.interface';

export type TypeTimerSessionState = Partial<
	Omit<ITimerSessionResponse, 'id' | 'createdAt' | 'updatedAt'>
>;

export type TypeTimerRoundState = Partial<
	Omit<ITimerRoundResponse, 'id' | 'createdAt' | 'updatedAt'>
>;
