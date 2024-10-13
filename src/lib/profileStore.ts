import { writable } from 'svelte/store';
import type { Tables } from './database.types';

export const profileStore = writable<Tables<'profiles'> | null>(null);
