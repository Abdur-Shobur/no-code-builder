import {
	IDevPermissionCategory,
	IDevPermissionCategoryStatus,
} from './dev-category-type';

const data = {
	status: true,
	message: 'Operation successful',
	data: [
		{
			_id: '67b217bfa0bbb5254443a95e',
			name: 'test',
			permissionKey: 'test',
			description: 'test',
			position: 1,
			status: 'active',
			createdAt: '2025-02-16T16:52:15.364Z',
			updatedAt: '2025-02-16T16:52:15.364Z',
			subcategories: [],
		},
	],
	statusCode: 200,
};

export interface IDevPermissionSubCategory {
	name: string;
	permissionKey: string;
	category: {
		_id: string;
		name: string;
		status: IDevPermissionCategoryStatus;
	};
	description: string;
	status: IDevPermissionSubCategoryStatus;
	position: number;
	createdAt: Date;
	updatedAt: Date;
	_id: string;
}

// for menu status
export enum IDevPermissionSubCategoryStatus {
	ForLoginUser = 'active',
	ForAnyOne = 'anyone',
	Inactive = 'inactive',
	Deleted = 'deleted',
}
