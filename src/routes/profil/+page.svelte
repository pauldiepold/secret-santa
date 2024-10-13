<script>
	import { profileStore } from '$lib/profileStore';
	import { userStore } from '$lib/userStore';
	import { requireAuth } from '$lib/authGuard';

	import { getContext } from 'svelte';

	requireAuth();

	const signOut = getContext('signOut');
</script>

{#if $profileStore && $userStore}
	<div class="flex flex-col items-center justify-start">
		<div class="avatar mb-10">
			<div class="rounded-full">
				<img alt="profile" src={$profileStore.picture} />
			</div>
		</div>

		<p class="text-4xl font-bold mb-2">{$profileStore.full_name}</p>
		<p class="text-md mb-10">{$userStore.email}</p>

		<button class="btn btn-primary px-8 text-lg" on:click={signOut}>Logout</button>
	</div>
{/if}
