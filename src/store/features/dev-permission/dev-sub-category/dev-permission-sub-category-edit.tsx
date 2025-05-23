'use client';

import React, { useState } from 'react';
import { Button, Form, FormProps, Input, Modal, Select } from 'antd';
import { IDevPermissionSubCategory } from '@/types';
import { stringFormat } from '@/helper';
import {
	useEditDevSubCategoryMutation,
	useGetDevCategoryQuery,
} from '../dev-permission-api-slice';

export const DevSubPermissionCategoryEdit = ({
	data,
}: {
	data: IDevPermissionSubCategory;
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const { data: devCategory, isLoading: categoryLoading } =
		useGetDevCategoryQuery({
			query: 'active',
		});
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	type FieldType = {
		name: string;
		description: string;
		category: string;
		status: string;
	};

	const [store, { isLoading }] = useEditDevSubCategoryMutation();
	const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
		try {
			const response = await store({
				...values,
				permissionKey: stringFormat(values.name),
				_id: data._id,
			}).unwrap();
			console.log(response);
			if (response?.statusCode === 200) {
				handleOk();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Update
			</Button>
			<Modal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				centered
				footer={null}
			>
				<h2 className="modal_title mb-4">Update Category</h2>

				<Form
					name="parent-auth"
					layout="vertical"
					onFinish={onFinish}
					autoComplete="off"
					className="space-y-3"
					initialValues={{
						status: data.status,
						name: data.name,
						description: data.description,
						category: data?.category?._id,
					}}
					form={form}
				>
					<Form.Item<FieldType>
						label="Name"
						name="name"
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Input placeholder="Enter name" />
					</Form.Item>

					<Form.Item<FieldType> label="Description" name="description">
						<Input.TextArea placeholder="Enter description" />
					</Form.Item>

					<Form.Item<FieldType>
						label="Dev Category"
						name="category"
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Select
							allowClear
							showSearch
							placeholder="select"
							options={devCategory?.data.map((item) => ({
								value: item._id,
								label: item.name,
							}))}
						></Select>
					</Form.Item>

					<Form.Item<FieldType>
						label="Status"
						name="status"
						rules={[{ required: true, message: 'This field is required' }]}
					>
						<Select
							allowClear
							showSearch
							placeholder="select"
							options={[
								{ value: 'active', label: 'Active' },
								{ value: 'inactive', label: 'Inactive' },
							]}
						></Select>
					</Form.Item>

					<Form.Item label={null}>
						<Button
							loading={isLoading}
							disabled={isLoading}
							type="primary"
							htmlType="submit"
							className="w-full"
							size="large"
						>
							Submit{isLoading && 'ing'}
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
