<script lang="ts">
	import '../app.css';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/userStore';
	import { profileStore } from '$lib/profileStore';
	import { setContext } from 'svelte';
	import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

	onMount(() => {
		const updateUserAndProfile = (session: Session | null) => {
			if (session?.user) {
				userStore.set(session.user);
				const {
					id: userId,
					user_metadata: { full_name: fullName, picture }
				} = session.user;
				updateProfile(userId, fullName, picture);
			} else {
				userStore.set(null);
			}
		};

		// supabase.auth.getSession().then(({ data: { session } }) => updateUserAndProfile(session));

		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) =>
			updateUserAndProfile(session)
		);

		return () => subscription.unsubscribe();
	});

	function signIn() {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: window.location.origin
			}
		});
	}

	function signOut() {
		supabase.auth.signOut();
		userStore.set(null);
		profileStore.set(null);
		goto('/');
	}

	setContext('signOut', signOut);

	async function updateProfile(userId: string, fullName: string, picture: string) {
		const { data, error } = await supabase
			.from('profiles')
			.upsert(
				{
					user_id: userId,
					full_name: fullName,
					picture: picture
				},
				{
					onConflict: 'user_id'
				}
			)
			.select();

		if (error) {
			console.error('Error updating profile:', error);
		}

		if (data && data.length === 1) profileStore.set(data[0]);
	}
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="pl-6 text-xl">Secret Santa</a>
	</div>
	<div class="space-x-4">
		{#if $userStore && $profileStore}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img alt="profile" src={$profileStore.picture} />
					</div>
				</div>
				<ul
					class="menu menu-sm dropdown-content text-accent-content bg-accent rounded-box z-[1] mt-3 w-52 p-2 shadow"
				>
					<li>
						<a href="/profil">
							Hallo {$profileStore.full_name}
						</a>
					</li>
					<li><button on:click={signOut}>Logout</button></li>
				</ul>
			</div>
		{:else}
			<button class="btn btn-primary px-8" on:click={signIn}>Login</button>
		{/if}
	</div>
</div>

<div class="p-8 container mx-auto">
	<slot />
</div>
