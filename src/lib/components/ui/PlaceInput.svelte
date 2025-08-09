<script lang="ts">
import {getPlaces} from "$lib/api";
import { clickoutside } from '@svelte-put/clickoutside';

let {place=$bindable()} = $props()

let input: String = $state('')
let result: ApiGetPlaces | undefined = $state()

async function search() {
  if (input.length < 3 || input.replaceAll(' ', '') === '') return
  result = await getPlaces(input)
  console.log(result)
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
  <input type="text" bind:value={input} oninput={search} class="w-full border border-black">
  {#if result}
    <div use:clickoutside onclickoutside={stopSearch} class="absolute flex flex-col gap-1 bg-white border border-black z-10 w-full">
      {#each result?.places as place}
        <button onclick={() => setPlace(place)} class="cursor-pointer hover:bg-neutral-300">
          {place.name}
        </button>
      {/each}
    </div>
  {/if}
</div>