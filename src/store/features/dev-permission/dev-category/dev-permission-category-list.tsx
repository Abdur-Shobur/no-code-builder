'use client';
import React from 'react';

import { DevPermissionCategoryStore } from './dev-permission-category-store';
import { useGetDevCategoryQuery } from '../dev-permission-api-slice';
import { DevPermissionCategoryDelete } from './dev-permission-category-components';
import { DevPermissionCategoryEdit } from './dev-permission-category-edit';

export function DevPermissionCategoryList() {
	const devCategory = useGetDevCategoryQuery({ query: '' });
	return (
		<div>
			<div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
				<h1 className="text-xl font-bold">Dev Category</h1>
				<DevPermissionCategoryStore />
			</div>
			<div className="grid grid-cols-6 gap-3">
				{devCategory.data?.data?.map((item) => (
					<div key={item._id} className="border shadow-md p-3 rounded-md">
						<p>{item.name}</p>
						<p>{item.status}</p>
						<p>{item.permissionKey}</p>
						<p>{item.description}</p>
						<div className="flex gap-2">
							<DevPermissionCategoryDelete data={item} />
							<DevPermissionCategoryEdit data={item} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
