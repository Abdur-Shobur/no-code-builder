'use client';

import { IDevPermissionCategory } from '@/types';
import { Button } from 'antd';
import React from 'react';
import { useDeleteDevCategoryMutation } from '../dev-permission-api-slice';

export function DevPermissionCategoryDelete({
	data,
}: {
	data: IDevPermissionCategory;
}) {
	const [deleting, { isLoading }] = useDeleteDevCategoryMutation();

	const handleDelete = () => {
		deleting(data._id);
	};
	return (
		<Button loading={isLoading} onClick={handleDelete} disabled={isLoading}>
			Delete
		</Button>
	);
}
