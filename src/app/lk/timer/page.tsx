import type { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { Timer } from './Timer';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Timer',
	...NO_INDEX_PAGE
};

export default function PomodoroPage() {
	return (
		<div>
			<Heading title='Таймер' />
			<Timer />
		</div>
	);
}
