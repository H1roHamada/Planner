import { EnumTaskPriority } from '../enum/task-priority.enum';

import type { IBase } from './root.interface';

export interface ITaskResponse extends IBase {
	name: string;
	priority?: EnumTaskPriority;
	isCompleted: boolean;
}
