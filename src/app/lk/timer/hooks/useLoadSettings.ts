import { useProfile } from '@/shared/hooks/useProfile';

export function useLoadSettings() {
	const { data } = useProfile();

	const workInterval = data?.user.workInterval ?? 0;
	const breakInterval = data?.user.workInterval ?? 0;

	return { workInterval, breakInterval };
}
