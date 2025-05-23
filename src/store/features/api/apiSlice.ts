import { env } from '@/lib';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

const baseQuery = fetchBaseQuery({
	baseUrl: `${env.baseAPI || 'http://[::1]:9099'}/api/v1/`,
	prepareHeaders: async (headers) => {
		const session = await getSession(); // Get session from NextAuth

		if (session) {
			headers.set('Authorization', `Bearer ${session.accessToken}`);
		}

		return headers;
	},
});

export const apiSlice = createApi({
	reducerPath: 'api',

	baseQuery,
	endpoints: () => ({}),
	refetchOnReconnect: true,
	refetchOnFocus: true,
	tagTypes: ['dev-permission-category', 'Tasks','dev-permission-sub-category'],
	keepUnusedDataFor: 50000,
});
