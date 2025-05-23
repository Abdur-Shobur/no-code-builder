'use client';

import { Button } from 'antd';
import React from 'react';
import { useDeleteDevSubCategoryMutation } from '../dev-permission-api-slice';
import { IDevPermissionSubCategory } from '@/types';

export function DevSubPermissionCategoryDelete({
	data,
}: {
	data: IDevPermissionSubCategory;
}) {
	const [deleting, { isLoading }] = useDeleteDevSubCategoryMutation();

	const handleDelete = () => {
		deleting(data._id);
	};
	return (
		<Button loading={isLoading} onClick={handleDelete} disabled={isLoading}>
			Delete
		</Button>
	);
}
