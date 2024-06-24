import type { IBase } from './root.interface';

export interface ITimerRoundResponse extends IBase {
	isCompleted?: boolean;
	totalSeconds: number;
}

export interface ITimerSessionResponse extends IBase {
	isCompleted?: boolean;
	rounds?: ITimerRoundResponse[];
}
