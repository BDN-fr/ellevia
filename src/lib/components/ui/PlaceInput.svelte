<script lang="ts">
	import { getPlaces } from '$lib/api';
	import { clickoutside } from '@svelte-put/clickoutside';
	import FavoritesPlaces from '../self/FavoritesPlaces.svelte';

	interface Props {
		place: Place | undefined;
		uid: string;
		favorites?: boolean;
	}
	let { place = $bindable(), uid, favorites = true }: Props = $props();

	let input = $derived.by(() => {
		if (place) {
			return place.name;
		}
		return '';
	});
	let result: ApiGetPlaces | undefined = $state();

	async function search() {
		if (input.length < 3 || input.replaceAll(' ', '') === '') return;
		let text = input;
		setTimeout(async () => {
			if (input != text) return;
			result = await getPlaces(input);
		}, 300);
	}

	function setPlace(p: Place) {
		place = p;
		input = place.name;
		result = undefined;
	}

	function stopSearch() {
		result = undefined;
		input = '';
	}
</script>

<div class="relative h-fit w-full">
	<div class="flex w-full border border-black">
		<input
			type="text"
			bind:value={input}
			oninput={search}
			id={uid}
			autocomplete="off"
			placeholder="Rechercher un lieu"
			class="flex-grow {favorites ? 'pl-1' : 'px-1'}"
		/>
		{#if favorites}
			<FavoritesPlaces bind:place />
		{/if}
	</div>
	{#if result}
		<div
			use:clickoutside
			onclickoutside={stopSearch}
			class="absolute z-10 flex max-h-48 w-full flex-col gap-1 overflow-y-auto border border-black bg-white"
		>
			{#each result?.places as place}
				<button onclick={() => setPlace(place)} class="cursor-pointer hover:bg-neutral-300">
					{place.name}
				</button>
			{/each}
		</div>
	{/if}
</div>
