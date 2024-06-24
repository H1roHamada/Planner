'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { TimeBlockingList } from './TimeBlockingList';
import { TimeBlockingForm } from './form/TimeBlockingForm';
import type { TypeTimeBlockFormState } from '@/shared/types/time.type';

export function TimeBlocking() {
	const methods = useForm<TypeTimeBlockFormState>();

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<TimeBlockingList />
				<TimeBlockingForm />
			</div>
		</FormProvider>
	);
}
