<script>
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let name = '';
	let description = '';
	let date = '';

	async function createEvent() {
		const { error } = await supabase.from('events').insert([{ name, description, date }]);
		if (error) {
			console.error('Error creating event:', error);
		} else {
			goto('/events');
		}
	}
</script>

<div class="breadcrumbs text-sm mb-10">
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/events">Alle Veranstaltungen</a></li>
		<li>Neue Veranstaltung hinzufügen</li>
	</ul>
</div>

<form on:submit|preventDefault={createEvent} class="flex flex-col space-y-8 items-start">

	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">Name der Veranstaltung:</span>
		</div>
		<input type="text" bind:value={name} required placeholder="Bitte eingeben..."
					 class="input input-bordered w-full max-w-xs" />
	</label>

	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">Beschreibung:</span>
		</div>
		<textarea type="text" bind:value={description} required placeholder="Bitte eingeben..."
					 class="textarea textarea-bordered h-24" />
	</label>


	<label class="form-control w-full max-w-xs">
		<div class="label">
			<span class="label-text">Datum der Veranstaltung:</span>
		</div>
		<input type="date" bind:value={date} required
					 class="input input-bordered w-full max-w-xs" />
	</label>

	<button class="btn btn-primary" type="submit">Event erstellen</button>
</form>