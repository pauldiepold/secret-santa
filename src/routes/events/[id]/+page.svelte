<script lang="ts">
	import { requireAuth } from '$lib/authGuard';
	import type { Tables } from '$lib/database.types';
	requireAuth();

	export let data: { event: Tables<'events'> | null };
</script>

{#if data.event}
	<div class="breadcrumbs text-sm mb-10">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/events">Alle Veranstaltungen</a></li>
			<li>{data.event.name}</li>
		</ul>
	</div>

	<h2>{data.event.name}</h2>
	<h3>{data.event.description}</h3>
	<h3>{data.event.date}</h3>
{/if}
