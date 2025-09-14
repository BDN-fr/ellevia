<script lang="ts">
	import Star from "@lucide/svelte/icons/star";
	import FavoritesPlacesModal from "./FavoritesPlacesModal.svelte";

  interface Props {
    place: Place | undefined
  }
  let { place = $bindable() }: Props = $props()

  let showModal = $state(false)
</script>

<button class="h-full w-auto cursor-pointer" onclick={(e) => {e.preventDefault(); showModal = !showModal}}>
  <Star />
</button>

{#if showModal}
  <FavoritesPlacesModal bind:opened={showModal} bind:place />
{/if}