import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
	const { data } = await supabase.from('events').select().eq('id', params.id).single();

	return {
		event: data
	};
}
