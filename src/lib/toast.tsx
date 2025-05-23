import { notification } from 'antd';
import { ArgsProps } from 'antd/es/message';
import { ReactNode } from 'react';
type ToastIsType = 'success' | 'info' | 'warning' | 'error';

type ToastType = {
	description?: string | ReactNode;
	message?: string;
	placement?: ArgsProps;
	duration?: number;
	type?: ToastIsType;
};
export const toast = ({
	message = 'Success',
	description = 'Successfully Completed',
	duration = 5,
	type = 'success',
}: ToastType) => {
	notification[type]({
		message,
		description,
		placement: 'topRight',
		duration,
		pauseOnHover: true,
	});
};
