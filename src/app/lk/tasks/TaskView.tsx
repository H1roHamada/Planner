'use client';

import Loader from '@/components/ui/Loader';

import { SwitcherView } from './SwitcherView';
import { KanbanView } from './kanban-view/KanbanView';
import { ListView } from './list-view/ListView';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

export type TypeView = 'list' | 'kanban';

export function TasksView() {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'type-view',
		defaultValue: 'list'
	});

	if (isLoading) return <Loader />;

	return (
		<div>
			<SwitcherView
				setType={setType}
				type={type}
			/>

			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	);
}
