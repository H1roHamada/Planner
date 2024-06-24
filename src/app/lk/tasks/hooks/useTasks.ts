import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { ITaskResponse } from '@/shared/interfaces/task.interface';
import { taskService } from '@/shared/services/task.service';

export function useTasks() {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks()
	});

	const [items, setItems] = useState<ITaskResponse[] | undefined>(data?.data);

	useEffect(() => {
		setItems(data?.data);
	}, [data?.data]);

	return { items, setItems };
}
