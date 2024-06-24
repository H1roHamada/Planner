import { Metadata } from 'next';

import { Auth } from './Auth';
import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants';

export const metaData: Metadata = {
	title: 'Auth',
	...NO_INDEX_PAGE
};

export default function AuthPage() {
	return <Auth />;
}
