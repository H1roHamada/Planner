'use client';

import cn from 'clsx';
import { Kanban, List } from 'lucide-react';

import { TypeView } from './TaskView';

interface ISwitcherView {
	type: TypeView;
	setType: (value: TypeView) => void;
}

export function SwitcherView({ setType, type }: ISwitcherView) {
	return (
		<div className='flex items-center gap-4 mb-5'>
			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'kanban'
				})}
				onClick={() => setType('list')}
			>
				<List />
				Список
			</button>

			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'list'
				})}
				onClick={() => setType('kanban')}
			>
				<Kanban />
				Доска
			</button>
		</div>
	);
}
