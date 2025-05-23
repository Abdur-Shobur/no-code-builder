import { IDevPermissionCategory, ResponseType } from '@/types';
import { apiSlice } from '../api/apiSlice';
import { IDevPermissionSubCategory } from '@/types/dev-sub-category-type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		/*=================
		 * get Dev Category
		 *==================*/
		getDevCategory: builder.query<
			ResponseType<IDevPermissionCategory[]>,
			{ query: string }
		>({
			query: (data) => ({
				url: 'dev-permission-category?status=' + data.query,
			}),

			providesTags: () => ['dev-permission-category'],
		}),

		/*=================
		 * store Dev Category
		 *==================*/
		storeDevCategory: builder.mutation<
			any,
			{
				name: string;
				description: string;
				status: string;
				permissionKey: string;
			}
		>({
			query: (data) => ({
				url: 'dev-permission-category',
				method: 'POST',
				body: data,
			}),

			invalidatesTags: ['dev-permission-category'],
		}),

		/*=================
		 * edit Dev Category
		 *==================*/
		editDevCategory: builder.mutation<
			any,
			{
				_id: string;
				name: string;
				description: string;
				status: string;
				permissionKey: string;
			}
		>({
			query: (data) => ({
				url: 'dev-permission-category/' + data._id,
				method: 'PATCH',
				body: data,
			}),

			invalidatesTags: [
				'dev-permission-category',
				'dev-permission-sub-category',
			],
		}),

		/*=================
		 * delete Dev Category
		 *==================*/
		deleteDevCategory: builder.mutation<any, string>({
			query: (data) => ({
				url: 'dev-permission-category/' + data,
				method: 'DELETE',
			}),

			invalidatesTags: [
				'dev-permission-category',
				'dev-permission-sub-category',
			],
		}),

		/*==============================================================
		 *
		 * get Sub Dev Category
		 *
		 *==============================================================*/
		getDevSubCategory: builder.query<
			ResponseType<IDevPermissionSubCategory[]>,
			any
		>({
			query: (data) => ({
				url: 'dev-permission-sub-category',
			}),

			providesTags: () => ['dev-permission-sub-category'],
		}),

		/*=================
		 * store Sub Dev Category
		 *==================*/
		storeDevSubCategory: builder.mutation<
			any,
			{
				name: string;
				description: string;
				status: string;
				permissionKey: string;
			}
		>({
			query: (data) => ({
				url: 'dev-permission-sub-category',
				method: 'POST',
				body: data,
			}),

			invalidatesTags: ['dev-permission-sub-category'],
		}),

		/*=================
		 * edit  Dev Sub Category
		 *==================*/
		editDevSubCategory: builder.mutation<
			any,
			{
				_id: string;
				name: string;
				description: string;
				status: string;
				permissionKey: string;
			}
		>({
			query: (data) => ({
				url: 'dev-permission-sub-category/' + data._id,
				method: 'PATCH',
				body: data,
			}),

			invalidatesTags: ['dev-permission-sub-category'],
		}),

		/*=================
		 * delete Dev Sub Category
		 *==================*/
		deleteDevSubCategory: builder.mutation<any, string>({
			query: (data) => ({
				url: 'dev-permission-sub-category/' + data,
				method: 'DELETE',
			}),

			invalidatesTags: ['dev-permission-sub-category'],
		}),
	}),
});

export const {
	useStoreDevCategoryMutation,
	useGetDevCategoryQuery,
	useEditDevCategoryMutation,
	useDeleteDevCategoryMutation,

	//
	useGetDevSubCategoryQuery,
	useStoreDevSubCategoryMutation,
	useEditDevSubCategoryMutation,
	useDeleteDevSubCategoryMutation,
} = api;
