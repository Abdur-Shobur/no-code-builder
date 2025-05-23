'use client';

import {
	AuthPage,
	ChangePassword,
	ChildAddParent,
	ChildSignUp,
	ForgetPassword,
	Login,
	Otp,
	ParentAddChild,
	ParentAuth,
	ParentSignUp,
	SignUP,
	TemporaryPassword,
} from '@/store/features/auth';
import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function Page() {
	const searchParams = useSearchParams();
	console.log(searchParams.toString());

	switch (searchParams.get('in_page')) {
		case 'login':
			return <Login />;

		case 'parent':
			return <ParentAuth />;

		case 'child':
			return <ParentAuth />;

		case 'forget':
			return <ForgetPassword />;

		case 'temporary_password':
			return <TemporaryPassword />;

		case 'change_password':
			return <ChangePassword />;

		case 'otp':
			return <Otp />;

		// sign up
		case 'signup':
			return <SignUP />;

		case 'parent_signup':
			return <ParentSignUp />;

		case 'child_signup':
			return <ChildSignUp />;

		case 'parent_add_child':
			return <ParentAddChild />;

		case 'child_add_parent':
			return <ChildAddParent />;

		default:
			return <AuthPage />;
	}
}
