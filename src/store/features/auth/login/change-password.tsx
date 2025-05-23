import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { BackNavigation, NotAccSignUp } from '../_ctx';
import { useRouter, useSearchParams } from 'next/navigation';

export function ChangePassword() {
	const router = useRouter();
	const searchParams = useSearchParams();

	type FieldType = {
		new_password?: string;
		old_password?: string;
		remember?: string;
	};

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
		if (searchParams.get('from') === 'parent_login') {
			router.push('/auth?in_page=parent&from=' + searchParams.get('from'));
		} else if (searchParams.get('from') === 'child_login') {
			router.push('/auth?in_page=child&from=' + searchParams.get('from'));
		}
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
		errorInfo
	) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm border p-5 rounded-lg relative group">
				<BackNavigation />

				<h2 className="modal_title mb-3">Create new password</h2>
				<p className="modal_sub_title">
					Enter new password and confirm password
				</p>
				<div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
					<Form
						name="dependencies"
						autoComplete="off"
						layout="vertical"
						onFinish={onFinish}
						className="space-y-3"
					>
						<Form.Item
							label="Password"
							name="password"
							rules={[{ required: true }]}
							className="!mb-0"
						>
							<Input.Password placeholder="Password" />
						</Form.Item>

						{/* Field */}
						<Form.Item
							label="Confirm Password"
							name="password2"
							dependencies={['password']}
							className="!mb-0"
							rules={[
								{
									required: true,
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue('password') === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error(
												'The new password that you entered do not match!'
											)
										);
									},
								}),
							]}
						>
							<Input.Password placeholder="Confirm Password" />
						</Form.Item>

						<Form.Item className="!mb-0" label={null}>
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
