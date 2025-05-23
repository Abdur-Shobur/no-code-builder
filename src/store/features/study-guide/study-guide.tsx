'use client';

import React from 'react';
import { Form, Checkbox, Radio, Button } from 'antd';

export const StudyGuideForm = () => {
	const onFinish = (values: any) => {
		console.log('Form values:', values);
	};

	return (
		<Form layout="vertical" onFinish={onFinish}>
			{/* Multiple Checkboxes */}
			<Form.Item name="topics" label="Choose Topics">
				<Checkbox.Group>
					<Checkbox value="topic1">Topic 1</Checkbox>
					<Checkbox value="topic2">Topic 2</Checkbox>
					<Checkbox value="topic3">Topic 3</Checkbox>
				</Checkbox.Group>
			</Form.Item>

			{/* Grade Selector */}
			<Form.Item name="grade" label="Choose Grade">
				<Radio.Group>
					<Radio value="grade1">Grade 1</Radio>
					<Radio value="grade2">Grade 2</Radio>
					<Radio value="grade3">Grade 3</Radio>
				</Radio.Group>
			</Form.Item>

			{/* Subject Selector */}
			<Form.Item name="subject" label="Choose Subject">
				<Radio.Group>
					<Radio value="math">Math</Radio>
					<Radio value="science">Science</Radio>
					<Radio value="history">History</Radio>
				</Radio.Group>
			</Form.Item>

			{/* Chapter Selector */}
			<Form.Item name="chapter" label="Choose Chapter">
				<Radio.Group>
					<Radio value="math">Math</Radio>
					<Radio value="science">Science</Radio>
					<Radio value="history">History</Radio>
				</Radio.Group>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};
