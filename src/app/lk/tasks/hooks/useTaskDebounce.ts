import debounce from 'lodash.debounce';
import { useCallback, useEffect } from 'react';
import { UseFormWatch } from 'react-hook-form';

import { useCreateTask } from './useCreateTask';
import { useUpdateTask } from './useUpdateTask';
import { TypeTaskForm } from '@/shared/types/task.type';

interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskForm>;
	itemId: string;
}

// TODO: переделать логику изменения/создания задачи (сделать подтверждение по кнопке/по 'Enter')
export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
	const { createTask } = useCreateTask();
	const { updateTask } = useUpdateTask();

	const debounceCreateTask = useCallback(
		debounce((formData: TypeTaskForm) => {
			createTask(formData);
		}, 2000),
		[]
	);

	const debounceUpdateTask = useCallback(
		debounce((formData: TypeTaskForm) => {
			updateTask({ id: itemId, data: formData });
		}, 2000),
		[]
	);

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debounceUpdateTask({
					...formData,
					priority: formData.priority || undefined
				});
			} else {
				debounceCreateTask(formData);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [watch(), debounceCreateTask, debounceUpdateTask]);
}
