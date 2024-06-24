import cn from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import styles from './TimerRounds.module.scss';
import { ITimerRoundResponse } from '@/shared/interfaces/timer.interface';

interface ITimerRoundsProps {
	rounds: ITimerRoundResponse[] | undefined;
	nextRoundHandler: () => void;
	prevRoundHandler: () => void;
	activeRound: ITimerRoundResponse | undefined;
}

export function TimerRounds({
	rounds,
	nextRoundHandler,
	prevRoundHandler,
	activeRound
}: ITimerRoundsProps) {
	const isCanPrevRound = rounds
		? rounds.some(round => round.isCompleted)
		: false;
	const isCanNextRound = rounds ? !rounds.at(-1)?.isCompleted : false;

	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				disabled={!isCanPrevRound}
				onClick={() => isCanPrevRound && prevRoundHandler()}
			>
				<ChevronLeft size={23} />
			</button>
			<div className={styles.roundsContainer}>
				{rounds &&
					rounds.map((round, index) => (
						<div
							key={index}
							className={cn(styles.round, {
								[styles.completed]: round.isCompleted,
								[styles.active]:
									round.id === activeRound?.id && !round.isCompleted
							})}
						/>
					))}
			</div>
			<button
				className={styles.button}
				disabled={!isCanNextRound}
				onClick={() => isCanNextRound && nextRoundHandler()}
			>
				<ChevronRight size={23} />
			</button>
		</div>
	);
}
