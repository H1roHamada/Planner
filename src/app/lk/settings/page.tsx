import type { Metadata } from 'next';

import { Heading } from '@/components/ui/Heading';

import { Settings } from './Settings';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metadata: Metadata = {
	title: 'Settings',
	...NO_INDEX_PAGE
};

export default function SettingsPage() {
	return (
		<div>
			<Heading title='Настройки' />
			<Settings />
		</div>
	);
}
