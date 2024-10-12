import { userStore } from './userStore';
import { redirect } from '@sveltejs/kit';

export function requireAuth() {
	if (!userStore) {
		throw redirect(303, '/');
	}
}
