<script lang="ts">
	import '../app.css';
	import { Header } from '$lib/components';
	import { invalidate } from '$app/navigation';
	import { setUserState } from '$lib/components/state/user-state.svelte';

	let { children, data } = $props();
	let { session, supabase, user } = $derived(data);

	let userState = setUserState({ session: data.session, supabase: data.supabase, user: data.user });

	$effect(() => {
		userState.updateState({ session, supabase, user });
	});

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Header />
{@render children()}
