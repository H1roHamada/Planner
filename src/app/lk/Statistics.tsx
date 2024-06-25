'use client';

import Loader from '@/components/ui/Loader';

import { useProfile } from '@/shared/hooks/useProfile';

export function Statistics() {
	const { data, isLoading } = useProfile();

	if (isLoading) {
		return <Loader />;
	}

	if (!data?.statistics.length) {
		return <div>Нет данных</div>;
	}

	return (
		<div className='grid grid-cols-4 gap-12 mt-7'>
			{data.statistics.map(stat => {
				return (
					<div
						className='bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500'
						key={stat.label}
					>
						<div className='font-semibold'>{stat.label}</div>
						<div className='text-3xl'>{stat.value}</div>
					</div>
				);
			})}
		</div>
	);
}
