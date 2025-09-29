<script lang="ts">
	import { getJourneys, getPlace } from '$lib/api';
	import { getCurrentIsoTime } from '$lib/functions';
	import Button from '../ui/Button.svelte';
	import PlaceInput from '../ui/PlaceInput.svelte';
	import TimeModal from './TimeModal.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { results = $bindable() } = $props();
	const uid = $props.id();
	const params = page.url.searchParams;

	let from: Place | undefined = $state();
	let to: Place | undefined = $state();

	async function search(event: Event) {
		event.preventDefault();
		if (!from || !to) return;
		results = await getJourneys(from?.id, to?.id, datetime, datetimeType);
	}

	let datetime: string | undefined | null = $state(params.get('datetime'));
	let datetimeType: 'departure' | 'arrival' = $state('departure');
	if (params.get('datetimetype') == 'arrival') {
		datetimeType = 'arrival';
	}
	let showTimeModal = $state(false);

	let link = $derived.by(() => {
		if (!(from && to)) {
			return null;
		}
		return (
			page.url.protocol +
			'//' +
			page.url.host +
			`/?from=${encodeURIComponent(from.id)}&fromName=${encodeURIComponent(from.name)}&to=${encodeURIComponent(to.id)}&toName=${encodeURIComponent(to.name)}&datetime=${encodeURIComponent(datetime ? datetime : getCurrentIsoTime())}&datetimetype=${datetimeType}`
		);
	});

	onMount(() => {
		let paramFrom = params.get('from');
		let paramFromName = params.get('fromName');
		if (paramFrom && paramFromName) {
			getPlace(paramFrom, paramFromName).then((res) => {
				from = res;
			});
		}

		let paramTo = params.get('to');
		let paramToName = params.get('toName');
		if (paramTo && paramToName) {
			getPlace(paramTo, paramToName).then((res) => {
				to = res;
			});
		}
	});
</script>

<form onsubmit={search} class="flex w-full max-w-100 flex-col items-center gap-2 p-2">
	<div class="mb-2 flex w-full flex-col items-center gap-1">
		<label for="{uid}From">Départ</label>
		<PlaceInput bind:place={from} uid="{uid}From" />
		<label for="{uid}To">Arrivée</label>
		<PlaceInput bind:place={to} uid="{uid}To" />
	</div>
	<Button type="button" principal={false} onclick={() => (showTimeModal = true)}>
		{datetimeType == 'departure' ? 'Départ' : 'Arrivée'}
		{#if datetime}
			le
			{new Date(datetime).toLocaleDateString()}
			à
			{new Date(datetime).toLocaleTimeString()}
		{:else}
			maintenant
		{/if}
	</Button>
	<Button type="submit">Afficher les trajets</Button>
	{#if link && results}
		<Button
			principal={false}
			type="button"
			onclick={() => {
				navigator.clipboard.writeText(link);
			}}
		>
			Copier le lien
		</Button>
	{/if}
</form>

{#if showTimeModal}
	<TimeModal bind:datetime bind:datetimeType bind:opened={showTimeModal} />
{/if}
