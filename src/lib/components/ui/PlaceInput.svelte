<script lang="ts">
import {getPlaces} from "$lib/api";
import { clickoutside } from '@svelte-put/clickoutside';

interface Props {
  place: Place | undefined,
  uid: string
}
let {place=$bindable(), uid}: Props = $props()

let input = $derived.by(() => {
  if (place) {
    return place.name
  }
  return ''
})
let result: ApiGetPlaces | undefined = $state()

async function search() {
  if (input.length < 3 || input.replaceAll(' ', '') === '') return
  let text = input
  setTimeout(async () => {
    if (input != text) return
    result = await getPlaces(input)
  }, 300)
}

function setPlace(p: Place) {
  place = p
  input = place.name
  result = undefined
}

function stopSearch() {
  result = undefined
  input = ''
}
</script>

<div class="relative w-full h-fit">
  <input type="text" bind:value={input} oninput={search} id={uid} autocomplete="off" class="w-full border border-black px-1">
  {#if result}
    <div use:clickoutside onclickoutside={stopSearch} class="absolute flex flex-col gap-1 bg-white border border-black z-10 w-full overflow-y-auto max-h-48">
      {#each result?.places as place}
        <button onclick={() => setPlace(place)} class="cursor-pointer hover:bg-neutral-300">
          {place.name}
        </button>
      {/each}
    </div>
  {/if}
</div>