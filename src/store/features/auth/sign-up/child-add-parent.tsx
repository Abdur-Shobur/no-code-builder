'use client';

import type { FormProps } from 'antd';
import { Avatar, Button, Form, Input, List, Modal, Radio } from 'antd';
import Link from 'next/link';
import React from 'react';
import { AddChild, AddParent, BackNavigation, HaveAccLogin } from '../_ctx';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import {
	useInviteToChildMutation,
	useInviteToParentMutation,
} from './sign-up-api-slice';
import { useSession } from 'next-auth/react';
type FieldType = {
	have_child_account?: 'yes' | 'no';
	message?: string;
	parent_id?: any;
};

export function ChildAddParent() {
	const { data: session } = useSession();
	const [store, { isLoading }] = useInviteToParentMutation();
	const [modal, setModal] = React.useState<{ data: any; status: boolean }>({
		data: null,
		status: false,
	});
	const [form] = Form.useForm();

	const parent_id = Form.useWatch('parent_id', form);
	const have_child_account = Form.useWatch('have_child_account', form);

	const router = useRouter();

	const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
		if (have_child_account === 'yes') {
			const { data } = await store({
				parentId: values.parent_id?.map((v: any) => v?._id),
				studentId: session?.user._id,
				message: values.message || '',
			});

			if (data?.statusCode === 200) {
				router.push('/user');
			}
			console.log('Success:', values);
		} else {
			router.push('/user');
		}
	};

	return (
		<div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
			<div className="border p-8 rounded-lg max-w-lg w-full mx-auto relative group">
				<BackNavigation />
				<h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
					Account Invitation to Parent
				</h2>
				<div className="mt-4  ">
					<Form
						initialValues={{ have_child_account: 'yes' }}
						form={form}
						name="parent-auth"
						layout="vertical"
						onFinish={onFinish}
						autoComplete="off"
						className="space-y-3"
					>
						<Form.Item<FieldType>
							name="have_child_account"
							label="Does Parent already have an account? "
						>
							<Radio.Group>
								<Radio value="yes"> Yes </Radio>
								<Radio value="no"> No </Radio>
							</Radio.Group>
						</Form.Item>
						{have_child_account === 'yes' && (
							<>
								<Form.List name="parent_id">
									{(fields, { add, remove }) => (
										<>
											<p className="db-label-1">Add Your Parent here</p>
											<div className="space-y-2">
												{fields.map(({ key, name }) => {
													const user = parent_id?.[name];

													return (
														<div
															key={key}
															className="flex justify-between items-center gap-2 border  p-2 rounded-md"
														>
															<p className="flex flex-col">
																<span>{user?.name}</span>
																<span>{user?.email}</span>
															</p>
															<Button
																size="small"
																danger
																type="dashed"
																icon={<X />}
																onClick={() => {
																	remove(name);
																}}
															></Button>
														</div>
													);
												})}
											</div>

											<div className="text-right">
												<Button
													type="dashed"
													size="small"
													className="!w-auto"
													onClick={() => setModal({ data: {}, status: true })}
													block
												>
													Add New
												</Button>

												<AddParent
													data={parent_id}
													modal={modal}
													setModalHandler={setModal}
													add={add}
												/>
											</div>
										</>
									)}
								</Form.List>

								<Form.Item<FieldType> name="message" label="Message">
									<Input.TextArea />
								</Form.Item>
							</>
						)}

						<Form.Item label={null}>
							<Button
								loading={isLoading}
								disabled={isLoading}
								type="primary"
								htmlType="submit"
								className="w-full"
								size="large"
							>
								Submit{isLoading && 'ing...'}
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	);
}
