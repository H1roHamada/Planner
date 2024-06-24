import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import type { ITimeBlockResponse } from '@/shared/interfaces/time-block.interface';
import { timeBlockService } from '@/shared/services/time-block.service';

export const useTimeBlocks = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['time-blocks'],
		queryFn: () => timeBlockService.getTimeBlocks()
	});

	const [items, setItems] = useState<ITimeBlockResponse[] | undefined>(
		data?.data
	);

	useEffect(() => {
		setItems(data?.data);
	}, [data?.data]);
	return { items, setItems, isLoading };
};
