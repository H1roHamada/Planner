import cn from 'clsx';
import { GripVertical, Loader, Trash } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Checkbox from '@/components/ui/checkbox';
import { TransparentField } from '@/components/ui/fields/TransparentField';
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect';
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker';

import { useDeleteTask } from '../hooks/useDeleteTask';
import { useTaskDebounce } from '../hooks/useTaskDebounce';

import styles from './ListView.module.scss';
import type { ITaskResponse } from '@/shared/interfaces/task.interface';
import type { TypeTaskForm } from '@/shared/types/task.type';

interface IListRowProps {
	item: ITaskResponse;
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

const getPriorityLabel = (priority: string) => {
	switch (priority) {
		case 'high':
			return 'Высокий';

		case 'medium':
			return 'Средний';

		case 'low':
			return 'Низкий';
		default:
			return '?';
	}
};

export function ListRow({ item, setItems }: IListRowProps) {
	const { register, control, watch } = useForm<TypeTaskForm>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	});

	useTaskDebounce({ watch, itemId: item.id });

	const { deleteTask, isDeletePending } = useDeleteTask();

	return (
		<div
			className={cn(
				styles.row,
				watch('isCompleted') ? styles.completed : '',
				'animation-opacity'
			)}
		>
			{/* isCompleted Checkbox */}
			<div>
				<span className='inline-flex items-center gap-2.5 w-full'>
					<button aria-describedby='todo-item'>
						<GripVertical className={styles.grip} />
					</button>
					<Controller
						control={control}
						name='isCompleted'
						render={({ field: { value, onChange } }) => (
							<Checkbox
								onChange={onChange}
								checked={value}
							/>
						)}
					/>

					<TransparentField {...register('name')} />
				</span>
			</div>
			{/* DatePicker */}
			<div>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			{/* Priority */}
			<div className='capitalize'>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={['high', 'medium', 'low'].map(item => {
								return {
									value: item,
									label: getPriorityLabel(item)
								};
							})}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			{/* Delete Button */}
			<div>
				<button
					onClick={() => {
						return item.id
							? deleteTask(item.id)
							: setItems(prev => prev?.slice(0, -1));
					}}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash scale={15} />}
				</button>
			</div>
		</div>
	);
}
