import React, { useState } from 'react';
import { Button, Form, FormProps, Input, Modal } from 'antd';

export const AdminGradeStore = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	type FieldType = {
		username?: string;
		email?: string;
		password?: string;
	};

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Create New Grade
			</Button>
			<Modal
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				centered
				footer={null}
			>
				<h2 className="modal_title mb-4">Create New Grade</h2>

				<Form
					name="parent-auth"
					layout="vertical"
					onFinish={onFinish}
					autoComplete="off"
					className="space-y-3"
				>
					<Form.Item<FieldType>
						label="Username"
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
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
						rules={[{ required: true, message: 'Please input your password!' }]}
						className="!mb-0"
					>
						<Input.Password />
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
			</Modal>
		</>
	);
};
