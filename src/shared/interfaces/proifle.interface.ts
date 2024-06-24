import { IUser } from './user.interface';

export interface IProfileResponse {
	user: IUser;
	statistics: {
		label: string;
		value: string;
	}[];
}
