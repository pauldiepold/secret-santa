<script lang="ts">
	import '../app.css';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { userStore } from '$lib/userStore';
	import { goto } from '$app/navigation';

	onMount(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			userStore.set(session?.user ?? null);
		});

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			userStore.set(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	});

	function signIn() {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: window.location.origin,
			}
		});
	}

	function signOut() {
		supabase.auth.signOut();
		userStore.set(null)
		goto('/');
	}
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Secret Santa</a>
	</div>
	<div class="space-x-4">
		{#if $userStore}
			<span>Willkommen, {$userStore.email}</span>
			<button class="btn" on:click={signOut}>Logout</button>
		{:else}
			<button class="btn" on:click={signIn}>Login</button>
		{/if}
	</div>
</div>

<div class="p-8 container mx-auto">
	<slot />
</div>
