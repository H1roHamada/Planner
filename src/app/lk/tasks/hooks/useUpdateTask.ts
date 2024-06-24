import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskService } from '@/shared/services/task.service';
import { TypeTaskForm } from '@/shared/types/task.type';

export function useUpdateTask(key?: string) {
	const queryClient = useQueryClient();

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update task', key],
		mutationFn: ({ id, data }: { id: string; data: TypeTaskForm }) =>
			taskService.updateTask(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks']
			});
		}
	});

	return { updateTask };
}
