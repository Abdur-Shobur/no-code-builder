'use client';
import React from 'react';

import { DevSubPermissionCategoryStore } from './dev-permission-sub-category-store';
import { useGetDevSubCategoryQuery } from '../dev-permission-api-slice';
import { DevSubPermissionCategoryDelete } from './dev-permission-sub-category-components';
import { DevSubPermissionCategoryEdit } from './dev-permission-sub-category-edit';

export function DevPermissionSubCategoryList() {
	const devCategory = useGetDevSubCategoryQuery({});
	console.log(devCategory.data?.data.map((e) => e._id));
	return (
		<div>
			<div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
				<h1 className="text-xl font-bold">Dev Sub Category</h1>
				<DevSubPermissionCategoryStore />
			</div>
			<div className="grid grid-cols-6 gap-3">
				{devCategory.data?.data?.map((item) => (
					<div key={item._id} className="border shadow-md p-3 rounded-md">
						<p>{item.name}</p>
						<p>{item.status}</p>
						<p>{item.description}</p>
						<p>{item.permissionKey}</p>
						<p>Category: {item?.category?.name}</p>
						<p>Status: {item?.category?.status}</p>
						<div className="flex gap-2">
							<DevSubPermissionCategoryDelete data={item} />
							<DevSubPermissionCategoryEdit data={item} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
