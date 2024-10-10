<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { authStore } from '$lib/authStore';

	export let redirectTo = '/';

	onMount(async () => {
		await authStore.check();
		if (!$authStore) {
			goto(redirectTo);
		}
	});
</script>

{#if $authStore}
	<slot />
{/if}