import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabaseClient';
import { goto } from '$app/navigation';

const REDIRECT_URL =
	import.meta.env.VITE_VERCEL == 1 ? import.meta.env.VITE_VERCEL_URL : 'http://localhost:5173';

console.log(REDIRECT_URL);
console.log(import.meta.env.VITE_VERCEL);
console.log(import.meta.env.VITE_VERCEL_URL);

function createAuthStore() {
	const { subscribe, set } = writable<User | null>(null);

	return {
		subscribe,
		signIn: () =>
			supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: REDIRECT_URL
				}
			}),
		signOut: async () => {
			await supabase.auth.signOut();
			set(null);
			goto('/');
		},
		setUser: (user: User | null) => set(user),
		check: async () => {
			const { data } = await supabase.auth.getSession();
			set(data.session?.user ?? null);
		}
	};
}

export const authStore = createAuthStore();
