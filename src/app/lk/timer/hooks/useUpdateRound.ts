import { useMutation, useQueryClient } from '@tanstack/react-query';

import { timerService } from '@/shared/services/timer.service';
import { TypeTimerRoundState } from '@/shared/types/timer.types';

export function useUpdateRound() {
	const queryClient = useQueryClient();

	const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
		mutationKey: ['update round'],
		mutationFn: ({ id, data }: { id: string; data: TypeTimerRoundState }) =>
			timerService.updateRound(id, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get today session'] });
		}
	});

	return { updateRound, isUpdateRoundPending };
}
