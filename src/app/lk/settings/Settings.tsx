'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/buttons/Button';
import { Field } from '@/components/ui/fields/Field';

import { useInitialData } from './useInitialData';
import { useUpdateSettings } from './useUpdateSettings';
import { TypeUserForm } from '@/shared/types/user.type';

export function Settings() {
	const { register, handleSubmit, reset } = useForm<TypeUserForm>({
		mode: 'onChange'
	});

	useInitialData(reset);

	const { isPending, mutate } = useUpdateSettings();

	const onSubmit: SubmitHandler<TypeUserForm> = (data: TypeUserForm) => {
		const { password, ...rest } = data;

		mutate({
			...rest,
			password: password || undefined
		});
	};

	return (
		<div>
			<form
				className='w-2/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						{/* Email */}
						<Field
							id='email'
							label='Email'
							placeholder='Введите email:'
							type='email'
							extra='mb-4'
							{...register('email', {
								required: 'Email - обязательное поле!'
							})}
						/>

						{/* Name */}
						<Field
							id='name'
							label='Имя'
							placeholder='Введите имя:'
							extra='mb-4'
							{...register('name')}
						/>

						{/* Password */}
						<Field
							id='password'
							label='Пароль'
							placeholder='Введите пароль:'
							type='password'
							extra='mb-10'
							{...register('password')}
						/>
					</div>

					<div>
						{/* Work Interval */}
						<Field
							isNumber
							id='workInterval'
							label='Время работы (мин.)'
							placeholder='Введите минуты:'
							extra='mb-4'
							{...register('workInterval', {
								valueAsNumber: true
							})}
						/>

						{/* Break Interval */}
						<Field
							isNumber
							id='breakInterval'
							label='Время перерыва (мин.):'
							placeholder='Введите минуты:'
							{...register('breakInterval', {
								valueAsNumber: true
							})}
							extra='mb-4'
						/>

						{/* Intervals Count */}
						<Field
							isNumber
							id='intervalsCount'
							label='Кол-во интервалов (макс. 10):'
							placeholder='Введите кол-во:'
							{...register('intervalsCount', {
								valueAsNumber: true,
								max: 10
							})}
							extra='mb-6'
						/>
					</div>
				</div>

				<Button
					type='submit'
					disabled={isPending}
				>
					Сохранить
				</Button>
			</form>
		</div>
	);
}
