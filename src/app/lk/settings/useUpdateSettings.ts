import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '@/shared/services/user.service';
import { TypeUserForm } from '@/shared/types/user.type';

export function useUpdateSettings() {
	const queryClient = useQueryClient();

	const key = 'update profile';

	const { isPending, mutate } = useMutation({
		mutationKey: [key],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		}
	});

	return { isPending, mutate };
}
