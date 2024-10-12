<script>
	import AuthGuard from '$lib/authGuard.svelte';

	export let data;
</script>

<div class="breadcrumbs text-sm mb-10">
	<ul>
		<li><a href="/">Home</a></li>
		<li>Alle Veranstaltungen</li>
	</ul>
</div>

<a class="btn btn-primary mb-10" href="/events/new">
	<button>Neues Event erstellen</button>
</a>

<ul>
	{#each data.events as event}
		<li class="list-disc list-inside ml-6">
			<a href="/events/{event.id}" class="underline ">
				{event.name}
			</a>
		</li>
	{/each}
</ul>