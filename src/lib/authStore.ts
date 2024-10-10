import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import { supabase } from '$lib/supabaseClient';
import { goto } from '$app/navigation';

function createAuthStore() {
	const { subscribe, set } = writable<User | null>(null);

	return {
		subscribe,
		signIn: () => supabase.auth.signInWithOAuth({ provider: 'google' }),
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