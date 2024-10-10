<script lang="ts">
	import AuthGuard from '$lib/authGuard.svelte';
</script>

<AuthGuard>
	<h1>Admin</h1>
	<!-- Hier kommt der geschützte Inhalt -->
</AuthGuard>