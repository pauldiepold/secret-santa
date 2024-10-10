import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://gwtfcvxpkgkhoxncbugj.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dGZjdnhwa2draG94bmNidWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NjQ3MTgsImV4cCI6MjA0NDE0MDcxOH0.KKYOINVelhm4xHtFAtFnaE6kpGxCbtZXmwtmpDoLqoA'
);
