import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskService } from '@/shared/services/task.service';
import { TypeTaskForm } from '@/shared/types/task.type';

export function useCreateTask() {
	const queryClient = useQueryClient();

	const { mutate: createTask } = useMutation({
		mutationKey: ['create task'],
		mutationFn: (data: TypeTaskForm) => taskService.createTask(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			});
		}
	});

	return { createTask };
}
