'use client';

import { Pause, Play, RefreshCcw } from 'lucide-react';

import Loader from '@/components/ui/Loader';
import { Button } from '@/components/ui/buttons/Button';

import { formatTime } from './format-time';
import { useCreateSession } from './hooks/useCreateSession';
import { useDeleteSession } from './hooks/useDeleteSession';
import { useTimer } from './hooks/useTimer';
import { useTimerActions } from './hooks/useTimerAction';
import { useTodaySession } from './hooks/useTodaySession';
import { TimerRounds } from './rounds/TimerRounds';

export function Timer() {
	const timerState = useTimer();
	const { isLoading, sessionsResponse, workInterval } =
		useTodaySession(timerState);

	const rounds = sessionsResponse?.data?.rounds;

	const actions = useTimerActions({ ...timerState, rounds });

	const { mutate, isPending } = useCreateSession();
	const { deleteSession, isDeletePending } = useDeleteSession(() => {
		return timerState.setSecondsLeft(workInterval * 60);
	});

	return (
		<div className='relative w-80 text-center'>
			{isLoading && <Loader />}

			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}

			{/* Если есть данные для таймера */}
			{sessionsResponse?.data && (
				<>
					<TimerRounds
						rounds={rounds}
						activeRound={timerState.activeRound}
						prevRoundHandler={actions.prevRoundHandler}
						nextRoundHandler={actions.nextRoundHandler}
					/>

					<button
						onClick={() => {
							timerState.setIsRunning(false);
							deleteSession(sessionsResponse.data.id);
						}}
						className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'
						disabled={isDeletePending}
					>
						<RefreshCcw size={19} />
					</button>
					<button
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
						onClick={
							timerState.isRunning ? actions.pauseHandler : actions.playHandler
						}
						disabled={actions.isUpdateRoundPending}
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>
				</>
			)}

			{/* Если нет данных для таймера (кнопка "создать таймер") */}

			{!sessionsResponse?.data && !isLoading && (
				<Button
					onClick={() => mutate()}
					className='mt-1'
					disabled={isPending}
				>
					Создать сессию
				</Button>
			)}
		</div>
	);
}
