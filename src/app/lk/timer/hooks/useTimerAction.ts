import type { ITimerState } from '../interfaces/timer.interface';

import { useLoadSettings } from './useLoadSettings';
import { useUpdateRound } from './useUpdateRound';
import type { ITimerRoundResponse } from '@/shared/interfaces/timer.interface';

type TypeUseTimerActions = ITimerState & {
	rounds: ITimerRoundResponse[] | undefined;
};

export function useTimerActions({
	activeRound,
	setIsRunning,
	secondsLeft,
	rounds,
	setActiveRound
}: TypeUseTimerActions) {
	const { workInterval } = useLoadSettings();
	const { isUpdateRoundPending, updateRound } = useUpdateRound();

	/** Остановить таймер */
	const pauseHandler = () => {
		setIsRunning(false);

		if (!activeRound?.id) return;

		updateRound({
			id: activeRound?.id,
			data: {
				totalSeconds: secondsLeft,
				isCompleted: Math.floor(secondsLeft / 60) >= workInterval
			}
		});
	};

	/** Запустить таймер */
	const playHandler = () => {
		setIsRunning(true);
	};

	/** След круг */
	const nextRoundHandler = () => {
		if (!activeRound?.id) return;

		updateRound({
			id: activeRound?.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60
			}
		});
	};

	const prevRoundHandler = () => {
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted);

		if (!lastCompletedRound?.id) return;

		updateRound({
			id: lastCompletedRound?.id,
			data: {
				isCompleted: false,
				totalSeconds: 0
			}
		});

		setActiveRound(lastCompletedRound);
	};

	return {
		isUpdateRoundPending,
		pauseHandler,
		playHandler,
		nextRoundHandler,
		prevRoundHandler
	};
}
