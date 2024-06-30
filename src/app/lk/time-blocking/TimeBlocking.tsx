'use client';

import { FormProvider, useForm } from 'react-hook-form';

import Loader from '@/components/ui/Loader';

import styles from './TimeBlocking.module.scss';
import { TimeBlockingList } from './TimeBlockingList';
import { TimeBlockingForm } from './form/TimeBlockingForm';
import { useTimeBlocks } from './hooks/useTimeBlocks';
import type { TypeTimeBlockFormState } from '@/shared/types/time.type';

export function TimeBlocking() {
	const formMethods = useForm<TypeTimeBlockFormState>();

	const { isLoading } = useTimeBlocks();

	if (isLoading) {
		return <Loader />;
	}

	return (
		<FormProvider {...formMethods}>
			<div className={styles.wrapper}>
				<TimeBlockingList />
				<TimeBlockingForm />
			</div>
		</FormProvider>
	);
}
