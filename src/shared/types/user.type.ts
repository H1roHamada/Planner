import { IUser } from '../interfaces/user.interface';

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string };
