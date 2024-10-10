<script lang="ts">
	import '../app.css';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/authStore';

	onMount(() => {
		authStore.check();

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			authStore.setUser(session?.user ?? null);
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Secret Santa</a>
	</div>
	<div class="space-x-4">
		{#if $authStore}
			<span>Willkommen, {$authStore.email}</span>
			<button class="btn" on:click={authStore.signOut}>Logout</button>
		{:else}
			<button class="btn" on:click={authStore.signIn}>Login</button>
		{/if}
	</div>
</div>

<div class="px-8 py-16">
	<slot />
</div>