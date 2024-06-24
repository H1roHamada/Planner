import { DropResult } from '@hello-pangea/dnd';

import { FILTERS } from '../columns.data';

import { useUpdateTask } from './useUpdateTask';

export function useTaskDnd() {
	const { updateTask } = useUpdateTask();

	const onDragEnd = (result: DropResult) => {
		// Если перетаскивание вне колонки
		if (!result.destination) return;

		const destinationColumnId = result.destination.droppableId;

		// Если перетаскивание в туже колонку, что и было
		if (destinationColumnId === result.source.droppableId) return;

		// Перетаскивание в колонку "Выполнено"
		if (destinationColumnId === 'completed') {
			updateTask({
				id: result.draggableId,
				data: {
					isCompleted: true
				}
			});

			return;
		}

		// Новая дата для задачи после перетаскивания
		const newCreatedAt = FILTERS[destinationColumnId].format();

		// Перетаскивание в любую другую колонку, кроме "Выполнено"
		updateTask({
			id: result.draggableId,
			data: {
				createdAt: newCreatedAt,
				isCompleted: false
			}
		});
	};

	return { onDragEnd };
}
