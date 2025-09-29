<script lang="ts">
	import Disruptions from '$lib/components/self/Disruptions.svelte';
	import JourneyCard from '$lib/components/self/JourneyCard.svelte';
	import JourneySearcher from '$lib/components/self/JourneySearcher.svelte';
	import { getErrorMessage } from '$lib/functions';
	import logo from '$lib/assets/images/logo.png';
	import Seo from '$lib/components/self/SEO.svelte';

	let results: ApiGetJourneys | undefined = $state();
</script>

<Seo />

<main
	class="flex min-h-svh w-full flex-col items-center lg:h-svh {results
		? 'justify-start lg:flex-row'
		: 'justify-center'} bg-white"
>
	<div class="flex w-full max-w-100 flex-col gap-4 {results ? 'mt-4 lg:mt-0 lg:ml-8' : ''}">
		<a
			href="/"
			class="right-0 left-0 mx-auto w-1/2"
			onclick={() => {
				results = undefined;
			}}><img src={logo} alt="logo" /></a
		>
		<JourneySearcher bind:results />
	</div>
	{#if results}
		<div
			class="m-2 flex h-full w-full flex-col items-center gap-2 p-2 pb-8 lg:mr-0 lg:justify-center-safe lg:overflow-y-scroll"
		>
			{#if results.error}
				<div class="w-fit border-2 border-red-500 bg-red-200 p-2">
					{#if getErrorMessage(results.error.id)}
						{getErrorMessage(results.error.id)}
					{:else}
						{results.error.id} <br />
						{results.error.message}
					{/if}
				</div>
			{/if}
			{#if results.disruptions.length > 0}
				<Disruptions disruptions={results.disruptions} />
			{/if}
			{#each results.journeys as journey (journey)}
				<JourneyCard {journey} />
			{/each}
		</div>
	{/if}
</main>
