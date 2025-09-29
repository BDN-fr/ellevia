<script lang="ts">
	import { Trash } from '@lucide/svelte';
	import PlaceInput from '../ui/PlaceInput.svelte';
	import Modal from '../ui/Modal.svelte';

	interface Props {
		opened: boolean;
		place?: Place | undefined;
	}
	let { opened = $bindable(true), place = $bindable() }: Props = $props();

	let uid = $props.id();

	if (!localStorage.getItem('favoritesPlaces')) {
		localStorage.setItem('favoritesPlaces', JSON.stringify([]));
	}
	let localStoragePlaces: Place[] = $state(
		JSON.parse(localStorage.getItem('favoritesPlaces') || '[]')
	);
	$effect(() => {
		localStorage.setItem('favoritesPlaces', JSON.stringify(localStoragePlaces));
	});

	let inputPlace: Place | undefined = $state();
	$effect(() => {
		if (inputPlace) {
			localStoragePlaces.push(inputPlace);
			inputPlace = undefined;
		}
	});
</script>

<Modal bind:opened>
	<div>
		<div class="flex w-100 max-w-full">
			<PlaceInput {uid} bind:place={inputPlace} favorites={false} />
		</div>
		<div class="flex h-48 max-w-100 flex-col overflow-y-auto">
			{#each localStoragePlaces as p, i}
				<div class="flex">
					<button
						class="flex-grow cursor-pointer hover:bg-neutral-300"
						onclick={() => {
							place = p;
							opened = false;
						}}
					>
						{p.name}
					</button>
					<button
						class="cursor-pointer"
						onclick={() => {
							localStoragePlaces.splice(i, 1);
						}}
					>
						<Trash class="hover:stroke-red-500" />
					</button>
				</div>
			{/each}
		</div>
	</div>
</Modal>
