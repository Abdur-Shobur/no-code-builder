'use client';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { BackNavigation, NotAccSignUp } from '../_ctx';

export function TemporaryPassword() {
	const router = useRouter();
	const searchParams = useSearchParams();
	type FieldType = {
		temporary_password?: string;
		password?: string;
		remember?: string;
	};

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
		router.push(
			'/auth?in_page=change_password&from=' + searchParams.get('from')
		);
	};

	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm border p-5 rounded-lg relative group">
				<BackNavigation />

				<h2 className="modal_title mb-3">Temporary password</h2>
				<p className="modal_sub_title">
					Check your email for the temporary password.
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
							label="Temporary password"
							name="temporary_password"
							rules={[
								{
									required: true,
									message: 'Please enter temporary password',
								},
							]}
							className="!mb-0"
						>
							<Input placeholder="Temporary password" />
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
