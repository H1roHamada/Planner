import type { IBase } from './root.interface';

export interface ITimeBlockResponse extends IBase {
	name: string;
	color?: string;
	duration: number;
	order: number;
}
