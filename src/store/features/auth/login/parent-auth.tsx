'use client';

import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { BackNavigation, NotAccSignUp } from '../_ctx';
import { useRouter, useSearchParams } from 'next/navigation';
import {
	useSignInParentMutation,
	useSignInStudentMutation,
} from '../sign-up/sign-up-api-slice';
import { signIn } from 'next-auth/react';
import { toast } from '@/lib';

export function ParentAuth() {
	const searchParams = useSearchParams();
	const from = searchParams.get('from');
	const router = useRouter();

	const [loginStudent, { isLoading: loadingStudent }] =
		useSignInStudentMutation();
	const [loginParent, { isLoading: loadingParent }] = useSignInParentMutation();
	type FieldType = {
		email?: string;
		password?: string;
	};

	const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
		console.log('Success:', values);

		if (from === 'parent_login') {
			const { data } = await loginParent(values);
			if (data?.statusCode === 200 && data?.data?.accessToken) {
				const result = await signIn('credentials', {
					token: JSON.stringify(data.data),
					redirect: false,
				});

				if (result?.error) {
					console.error('Sign in error:', result.error);
					return;
				}

				if (result?.ok) {
					router.push('/admin');
				}
			}

			if (!data.status) {
				toast({ message: 'Error', description: data.message, type: 'error' });
			}
		} else if (from === 'child_login') {
			const { data } = await loginStudent(values);

			if (data?.statusCode === 200 && data?.data?.accessToken) {
				const result = await signIn('credentials', {
					token: JSON.stringify(data.data),
					redirect: false,
				});

				if (result?.error) {
					console.error('Sign in error:', result.error);
					return;
				}

				if (result?.ok) {
					router.push('/user');
				}
			}

			if (!data.status) {
				toast({ message: 'Error', description: data.message, type: 'error' });
			}
		}
	};

	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
			<div className="border p-8 rounded-lg max-w-lg w-full mx-auto relative group">
				<BackNavigation />
				<h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Sign in to your account
				</h2>
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
							<Input type="email" placeholder="Enter your email" />
						</Form.Item>

						<Form.Item<FieldType>
							label="Password"
							name="password"
							rules={[
								{ required: true, message: 'Please input your password!' },
							]}
							className="!mb-0"
						>
							<Input.Password />
						</Form.Item>

						<div className="flex justify-end">
							<Link
								className="inline-block"
								href={`/auth?in_page=forget&from=${searchParams.get('from')}`}
							>
								Forget Password
							</Link>
						</div>

						<Form.Item label={null}>
							<Button
								disabled={loadingStudent || loadingParent}
								loading={loadingStudent || loadingParent}
								type="primary"
								htmlType="submit"
								className="w-full"
								size="large"
							>
								Submit{loadingStudent || loadingParent ? 'ing...' : ''}
							</Button>
						</Form.Item>
					</Form>

					<NotAccSignUp />
				</div>
			</div>
		</div>
	);
}
