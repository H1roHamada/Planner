import { message } from 'antd';

type TypeNotification = 'success' | 'error' | 'warning';

export function notification(type: TypeNotification, text: string) {
	switch (type) {
		case 'success':
			message.success(text);
			break;
		case 'warning':
			message.warning(text);
			break;

		case 'error':
			message.error(text);
			break;
	}
}
