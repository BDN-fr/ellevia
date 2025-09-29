<script lang="ts">
	import Button from '../ui/Button.svelte';
	import Sections from '../ui/Sections.svelte';
	import { durationString, dateTimeString } from '$lib/functions';
	import TransportBadge from '../ui/TransportBadge.svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		journey: Journey;
	}
	let { journey }: Props = $props();

	let expend = $state(false);
</script>

<div class="relative w-full border border-black p-2 {expend ? 'max-w-160' : 'max-w-80'}">
	<div>
		{dateTimeString(journey.departure_date_time)} → {dateTimeString(journey.arrival_date_time)} - {durationString(
			journey.duration
		)}
	</div>
	{#if !journey.tags.find((v, i, obj) => v == 'non_pt')}
		<div class="flex flex-wrap gap-2 p-2">
			{#each journey.sections as section}
				{#if section.type == 'public_transport' || (section.type == 'on_demand_transport' && section.display_informations)}
					<TransportBadge
						color={section.display_informations.color}
						textColor={section.display_informations.text_color}
						code={section.display_informations.code}
					/>
				{/if}
			{/each}
		</div>
	{/if}
	Marche: {durationString(journey.durations.walking)}
	{#if expend}
		<div
			transition:slide={{ duration: 200 }}
			class="my-2 flex flex-col gap-2 border-t border-black pt-2"
		>
			<Sections sections={journey.sections} />
		</div>
	{/if}
	<div class="right-0 left-0 mx-auto w-fit">
		<Button
			onclick={() => {
				expend = !expend;
			}}
			principal={!expend}
		>
			{#if expend}
				Réduire
			{:else}
				Afficher plus
			{/if}
		</Button>
	</div>
</div>
