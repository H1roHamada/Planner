import { Edit, GripVertical, Loader, Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import styles from './TimeBlocking.module.scss';
import { COLORS } from './form/colors.data';
import { useDeleteTimeBlock } from './hooks/useDeleteTimeBlock';
import { useTimeBlockSortable } from './hooks/useTimeBlockSortable';
import type { ITimeBlockResponse } from '@/shared/interfaces/time-block.interface';
import type { TypeTimeBlockFormState } from '@/shared/types/time.type';

export function TimeBlock({ item }: { item: ITimeBlockResponse }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		style: timeBlockingStyles
	} = useTimeBlockSortable(item.id);

	const { reset } = useFormContext<TypeTimeBlockFormState>();
	const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock(item.id);

	const convertMinutesToTime = (minutes: number): string => {
		const h = Math.floor(minutes / 60);
		const m = Math.floor(minutes % 60);

		const time = {
			h: h < 10 ? `0${h}` : h.toString(),
			m: m < 10 ? `0${m}` : m.toString()
		};

		return `${time.h}:${time.m}`;
	};

	const handleDelete = () => {
		deleteTimeBlock();
		reset({
			name: '',
			color: COLORS.DEFAULT,
			id: undefined,
			order: 1
		});
	};

	return (
		<div
			ref={setNodeRef}
			style={timeBlockingStyles}
		>
			<div
				className={styles.block}
				style={{
					backgroundColor: item.color || 'lightgray'
				}}
			>
				<div className={styles.content}>
					<button
						{...attributes}
						{...listeners}
						aria-describedby='time-block'
					>
						<GripVertical className={styles.grip} />
					</button>

					<div className={styles.content_text}>
						<i className='text-xs opacity-50 mb-1'>
							Затрачено времени: {convertMinutesToTime(item.duration)}
						</i>
						<br />
						{item.name}
					</div>

					<div className={styles.actions}>
						<button
							onClick={() => {
								reset({
									id: item.id,
									color: item.color,
									duration: item.duration,
									name: item.name,
									order: item.order
								});
							}}
							className={styles.actions_edit}
						>
							<Edit size={16} />
						</button>
						<button
							onClick={handleDelete}
							className={styles.actions_delete}
						>
							{isDeletePending ? (
								<Loader
									size={16}
									className='animate-spin'
								/>
							) : (
								<Trash size={16} />
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
