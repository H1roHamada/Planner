import { ConfigProvider, Empty } from 'antd';

interface EmptyDataProp {
	description?: string;
	className?: string;
}

export function EmptyData({
	description = 'Данные отсутствуют',
	className
}: EmptyDataProp) {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorTextDescription: '#fff'
				}
			}}
		>
			<div className={className}>
				<Empty
					image={Empty.PRESENTED_IMAGE_SIMPLE}
					description={description}
				/>
			</div>
		</ConfigProvider>
	);
}
