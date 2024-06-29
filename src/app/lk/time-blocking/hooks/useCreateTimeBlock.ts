import { useMutation, useQueryClient } from '@tanstack/react-query';

import { timeBlockService } from '@/shared/services/time-block.service';
import type { TypeTimeBlockFormState } from '@/shared/types/time.type';

export function useCreateTimeBlock() {
	const queryClient = useQueryClient();

	const {
		mutate: createTimeBlock,
		isPending: isCreateTimeBlockPending,
		isSuccess: isCreateTimeBlockSuccess,
		isError: isCreateTimeBlockError
	} = useMutation({
		mutationKey: ['create time-block'],
		mutationFn: (data: TypeTimeBlockFormState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks']
			});
		}
	});

	return {
		createTimeBlock,
		isCreateTimeBlockPending,
		isCreateTimeBlockSuccess,
		isCreateTimeBlockError
	};
}
