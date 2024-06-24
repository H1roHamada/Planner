import { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { Statistics } from './Statistics';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metaData: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
};

export default function DashboardPage() {
	return (
		<div>
			<Heading title='Статистика' />
			<Statistics />
		</div>
	);
}
