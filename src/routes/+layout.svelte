<script>
	import '../app.css';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const user = writable(null);

	onMount(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			user.set(session?.user ?? null);
		});

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			user.set(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	});

	function signIn() {
		supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	}

	function signOut() {
		supabase.auth.signOut();
	}
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a class="btn btn-ghost text-xl">Secret Santa</a>
	</div>
	<div class="space-x-4">
		{#if $user}
			<span>Willkommen, {$user.email}</span>
			<button class="btn" on:click={signOut}>Logout</button>
		{:else}
			<button class="btn" on:click={signIn}>Login</button>
		{/if}
	</div>
</div>

<div class="px-8 py-16">
	<slot />
</div>