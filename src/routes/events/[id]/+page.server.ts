import { supabase } from '$lib/supabaseClient';
import type { Tables } from '$lib/database.types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { data, error } = await supabase.from('events').select().eq('id', params.id).single();

	if (error) {
		console.error('Error fetching event:', error);
		return { event: null };
	}

	return { event: data as Tables<'events'> };
};
