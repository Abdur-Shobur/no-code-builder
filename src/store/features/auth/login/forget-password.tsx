import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { BackNavigation, NotAccSignUp } from '../_ctx';
import { useRouter, useSearchParams } from 'next/navigation';

export function ForgetPassword() {
	const router = useRouter();
	const searchParams = useSearchParams();
	type FieldType = {
		email?: string;
		password?: string;
		remember?: string;
	};

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
		router.push(
			'/auth?in_page=temporary_password&from=' + searchParams.get('from')
		);
	};

	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm border p-5 rounded-lg relative group">
				<BackNavigation />

				<h2 className="modal_title mb-3">Forgot password?</h2>
				<p className="modal_sub_title">
					Enter the email address you used to create your account. We’ll send a
					password reset email.
				</p>
				<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
					<Form
						name="parent-auth"
						layout="vertical"
						onFinish={onFinish}
						autoComplete="off"
						className="space-y-3"
					>
						<Form.Item<FieldType>
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: 'Please input your email!',
									type: 'email',
								},
							]}
							className="!mb-0"
						>
							<Input placeholder="Enter your email" />
						</Form.Item>

						<Form.Item label={null}>
							<Button
								type="primary"
								htmlType="submit"
								className="w-full"
								size="large"
							>
								Submit
							</Button>
						</Form.Item>
					</Form>

					<NotAccSignUp />
				</div>
			</div>
		</div>
	);
}
