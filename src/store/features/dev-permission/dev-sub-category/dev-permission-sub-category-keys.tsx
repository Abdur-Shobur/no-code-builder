'use client';
import React from 'react';

import { DevSubPermissionCategoryStore } from './dev-permission-sub-category-store';
import { useGetDevSubCategoryQuery } from '../dev-permission-api-slice';
import { DevSubPermissionCategoryDelete } from './dev-permission-sub-category-components';
import { DevSubPermissionCategoryEdit } from './dev-permission-sub-category-edit';
import { Input } from 'antd';

export function DevPermissionSubCategoryKeys() {
	const devCategory = useGetDevSubCategoryQuery({});
	return (
		<div>
			<div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
				<h1 className="text-xl font-bold">Dev Sub Category</h1>
				<DevSubPermissionCategoryStore />
			</div>
			<div>
				<Input.TextArea
					placeholder="Search"
					style={{ height: '80vh' }}
					value={`export enum Role {\n${devCategory.data?.data?.map(
						(item) =>
							`${item.permissionKey.toUpperCase()} = '${item.permissionKey}'\n`
					)}}`}
				/>
			</div>
		</div>
	);
}
