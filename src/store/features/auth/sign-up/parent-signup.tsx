'use client';

import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import React from 'react';
import { BackNavigation, HaveAccLogin } from '../_ctx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignUpParentMutation } from './sign-up-api-slice';
import { signIn } from 'next-auth/react';
import { toast } from '@/lib';

export function ParentSignUp() {
	const [store, { isLoading }] = useSignUpParentMutation();
	const searchParams = useSearchParams();
	const router = useRouter();
	type FieldType = {
		name?: string;
		email?: string;
		password?: string;
	};

	const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
		const { data } = await store(values);

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
				router.push('/auth?in_page=otp&from=' + searchParams.get('from'));
			}
		}
		if (!data?.status && data) {
			toast({ message: 'Error', description: data.message, type: 'error' });
		}
	};

	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
			<div className="border p-8 rounded-lg max-w-lg w-full mx-auto relative group">
				<BackNavigation />
				<h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Sign Up to your account
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
							label="Name"
							name="name"
							rules={[{ required: true, message: 'Please input your name!' }]}
							className="!mb-0"
						>
							<Input />
						</Form.Item>
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
							<Input />
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

						<p className="modal_sub_title text-left">
							By creating an account, you agree to our{' '}
							<Link
								href="/terms"
								className="font-semibold text-indigo-600 hover:text-indigo-500"
							>
								Terms of Service
							</Link>
						</p>

						<Form.Item label={null}>
							<Button
								loading={isLoading}
								disabled={isLoading}
								type="primary"
								htmlType="submit"
								className="w-full"
								size="large"
							>
								Submit{isLoading ? 'ing...' : ''}
							</Button>
						</Form.Item>
					</Form>

					<HaveAccLogin />
				</div>
			</div>
		</div>
	);
}
