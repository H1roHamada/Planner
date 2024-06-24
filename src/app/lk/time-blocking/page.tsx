import type { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { TimeBlocking } from './TimeBlocking';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Time blocking',
	...NO_INDEX_PAGE
};

export default function TimeBlockingPage() {
	return (
		<div>
			<Heading title='Планирование' />
			<TimeBlocking />
		</div>
	);
}
