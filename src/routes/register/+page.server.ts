import { fail, redirect } from '@sveltejs/kit';

interface ReturnObject {
	success: boolean;
	email: string;
	password: string;
	passwordConfirmation: string;
	name: string;
	errors: string[];
}

export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const passwordConfirmation = formData.get('passwordConfirmation') as string;

		const returnObject: ReturnObject = {
			success: true,
			email,
			password,
			passwordConfirmation,
			name,
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
