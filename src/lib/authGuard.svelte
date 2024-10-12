<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/userStore';

	export let redirectTo = '/';

	onMount(async () => {
		await userStore.check();
		if (!$userStore) {
			goto(redirectTo);
		}
	});
</script>

{#if $userStore}
	<slot />
{/if}
