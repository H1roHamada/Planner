import { DndContext, closestCenter } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy
} from '@dnd-kit/sortable';

import { EmptyData } from '@/components/ui/empty/Empty';

import { TimeBlock } from './TimeBlock';
import styles from './TimeBlocking.module.scss';
import { calcHoursLeft } from './calc-hours-left';
import { useTimeBlockDnd } from './hooks/useTimeBlockDnd';
import { useTimeBlocks } from './hooks/useTimeBlocks';

export function TimeBlockingList() {
	const { items, setItems } = useTimeBlocks();
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems);

	const { hoursLeft } = calcHoursLeft(items);

	if (!items?.length) {
		return <EmptyData className={styles.list} />;
	}

	return (
		<div className={styles.list}>
			{
				<p style={{ marginBottom: '10px' }}>
					{hoursLeft > 0
						? `Осталось на сон: ${hoursLeft} ч.`
						: 'Без сна будет тяжко'}
				</p>
			}

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.map(item => (
							<TimeBlock
								key={item.id}
								item={item}
							/>
						))}
					</SortableContext>
				</div>
			</DndContext>
		</div>
	);
}
