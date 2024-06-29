import { useMutation, useQueryClient } from '@tanstack/react-query';

import { timeBlockService } from '@/shared/services/time-block.service';
import type { TypeTimeBlockFormState } from '@/shared/types/time.type';

export function useUpdateTimeBlock(key?: string) {
	const queryClient = useQueryClient();

	const {
		mutate: updateTimeBlock,
		isPending: isUpdateTimeBlockPending,
		isSuccess: isUpdateTimeBlockSuccess,
		isError: isUpdateTimeBlockError
	} = useMutation({
		mutationKey: ['update time-block', key],
		mutationFn: ({ id, data }: { id: string; data: TypeTimeBlockFormState }) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks']
			});
		}
	});

	return {
		updateTimeBlock,
		isUpdateTimeBlockPending,
		isUpdateTimeBlockSuccess,
		isUpdateTimeBlockError
	};
}
