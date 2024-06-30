import {
	Button,
	ColorPicker,
	Form,
	Input,
	Space,
	TimePicker,
	Typography
} from 'antd';
import dayjs from 'dayjs';
import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';

import styles from '../TimeBlocking.module.scss';
import { useCreateTimeBlock } from '../hooks/useCreateTimeBlock';
import { useUpdateTimeBlock } from '../hooks/useUpdateTimeBlock';

import { COLORS } from './colors.data';
import type { TypeTimeBlockFormState } from '@/shared/types/time.type';

interface ITime {
	h: number;
	m: number;
}

export function TimeBlockingForm() {
	const { control, watch, reset, handleSubmit, getValues, setValue } =
		useFormContext<TypeTimeBlockFormState>();

	const existsId = watch('id');
	const color = watch('color', COLORS.DEFAULT);

	const { updateTimeBlock, isUpdateTimeBlockSuccess } =
		useUpdateTimeBlock(existsId);

	const {
		createTimeBlock,
		isCreateTimeBlockPending,
		isCreateTimeBlockSuccess
	} = useCreateTimeBlock();

	const [time, setTime] = useState<ITime>({ h: 0, m: 0 });

	/** Очистка формы */
	const clearForm = () => {
		reset({
			name: '',
			color: COLORS.DEFAULT,
			id: undefined,
			order: 1
		});

		setTime({ h: 0, m: 0 });
	};

	/** Конвертация времени формата hh:mm в минуты */
	const convertTimeToMinutes = (): number => {
		if (!time) return 0;

		return Number(time.h) * 60 + Number(time.m);
	};

	/** Сохранение */
	const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
		const { id, ...rest } = data;
		const dto = {
			...rest,
			duration: convertTimeToMinutes(),
			color: color || undefined
		};

		id ? updateTimeBlock({ id, data: dto }) : createTimeBlock(dto);
	};

	const setRandomColor = () => {
		const randomColor = `#${((Math.random() * 0xfff) << 0).toString(16)}`;
		setValue('color', randomColor);
	};

	// TODO: переделать логику
	// Установить значение при редактировании для "Время"
	useEffect(() => {
		const minutes = getValues('duration');

		setTime({
			h: minutes ? Math.floor(minutes / 60) : 0,
			m: minutes ? Math.floor(minutes % 60) : 0
		});
	}, [watch('duration')]);

	// TODO: переделать логику
	// Чистка формы после успешного сохранения данных
	useEffect(() => {
		clearForm();
	}, [isCreateTimeBlockSuccess, isUpdateTimeBlockSuccess]);

	return (
		<Form
			className={styles.form}
			onFinish={handleSubmit(onSubmit)}
		>
			{/* Описание */}
			<Form.Item<TypeTimeBlockFormState>>
				<Controller
					name='name'
					defaultValue=''
					control={control}
					rules={{ required: true }}
					render={({ field }) => (
						<div>
							<Typography.Title level={5}>Описание:</Typography.Title>
							<Input.TextArea
								{...field}
								autoSize={{
									minRows: 1,
									maxRows: 12
								}}
								placeholder='Введите описание:'
							/>
						</div>
					)}
				/>
			</Form.Item>

			{/* Время */}
			<Form.Item<TypeTimeBlockFormState>>
				<Controller
					name='duration'
					control={control}
					render={() => (
						<div>
							<Typography.Title level={5}>Время:</Typography.Title>

							<TimePicker
								showNow={false}
								format={'HH:mm'}
								value={dayjs(`${time?.h}:${time?.m}`, 'HH:mm')}
								onChange={time => {
									setTime({
										h: time?.hour() ?? 0,
										m: time?.minute() ?? 0
									});
								}}
							/>
						</div>
					)}
				/>
			</Form.Item>

			{/* Выбор цвета */}
			<Form.Item<TypeTimeBlockFormState>>
				<Controller
					name='color'
					control={control}
					render={() => (
						<div>
							<Typography.Title level={5}>Цвет:</Typography.Title>
							<Space>
								<Button
									icon={<RefreshCw />}
									onClick={setRandomColor}
								/>

								<ColorPicker
									arrow={true}
									showText
									defaultFormat='rgb'
									value={color}
									onChange={value => setValue('color', `#${value.toHex()}`)}
								></ColorPicker>
							</Space>
						</div>
					)}
				/>
			</Form.Item>

			{/* Кнопки */}
			<div
				style={{
					display: 'flex',
					gap: '10px'
				}}
			>
				<Button
					type='primary'
					htmlType='submit'
					className='mt-6'
					loading={isCreateTimeBlockPending}
				>
					{existsId ? 'Сохранить' : 'Создать'}
				</Button>

				{existsId && (
					<Button
						type='primary'
						danger={true}
						disabled={isCreateTimeBlockPending}
						className='mt-6'
						onClick={clearForm}
					>
						Отмена
					</Button>
				)}
			</div>
		</Form>
	);
}
