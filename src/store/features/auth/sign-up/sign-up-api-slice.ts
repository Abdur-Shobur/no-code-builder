import { IParent, ResponseType } from '@/types';
import { apiSlice } from '../../api/apiSlice';
import { OtpVerifyParentResponse, SignUpParentResponse } from './_type';

const api = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		signUpParent: builder.mutation<SignUpParentResponse, any>({
			query: (data) => ({
				url: 'parent-registration',
				method: 'POST',
				body: data,
			}),
		}),

		signUpStudent: builder.mutation<SignUpParentResponse, any>({
			query: (data) => ({
				url: 'student-registration',
				method: 'POST',
				body: data,
			}),
		}),

		otpVerifyParent: builder.mutation<OtpVerifyParentResponse, any>({
			query: (data) => ({
				url: 'parent-registration/verify-otp',
				method: 'POST',
				body: data,
			}),
		}),

		findByParentEmail: builder.query<ResponseType<IParent[]>, any>({
			query: (data) => ({
				url: `parent-registration/find-by-email/${data}`,
				method: 'GET',
			}),
		}),

		findByChildEmail: builder.query<any, any>({
			query: (data) => ({
				url: `student-registration/find-by-email/${data}`,
				method: 'GET',
			}),
		}),

		inviteToParent: builder.mutation<any, any>({
			query: (data) => ({
				url: 'student-invitation',
				method: 'POST',
				body: data,
			}),
		}),

		inviteToChild: builder.mutation<any, any>({
			query: (data) => ({
				url: 'parent-invitation',
				method: 'POST',
				body: data,
			}),
		}),

		// sign in
		signInParent: builder.mutation<any, any>({
			query: (data) => ({
				url: 'parent-registration/login',
				method: 'POST',
				body: data,
			}),
		}),

		signInStudent: builder.mutation<any, any>({
			query: (data) => ({
				url: 'student-registration/login',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const {
	useSignUpParentMutation,
	useOtpVerifyParentMutation,
	useSignUpStudentMutation,
	useFindByParentEmailQuery,
	useFindByChildEmailQuery,
	useInviteToParentMutation,
	useInviteToChildMutation,

	useSignInStudentMutation,
	useSignInParentMutation,
} = api;
