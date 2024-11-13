import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

interface ReturnObject {
	success: boolean;
	errors: string[];
}

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('passwordConfirmation') as string;

		const returnObject: ReturnObject = {
			success: true,
			errors: []
		};

		if (name.length < 3) {
			returnObject.errors.push('Name must be at least 3 characters long');
		}

		if (!email.length) {
			returnObject.errors.push('Email is required!');
		}

		if (!password.length) {
			returnObject.errors.push('Password is required!');
		}

		if (password !== passwordConfirmation) {
			returnObject.errors.push('Passwords do not match!');
		}

		if (returnObject.errors.length > 0) {
			returnObject.success = false;
			return returnObject;
		}

		const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error || !data.user) {
			console.log('There was an error signing up');
			console.log(error);
			returnObject.success = false;
			return fail(400, returnObject as any);
		}

		redirect(303, '/private/dashboard');
	}
};
