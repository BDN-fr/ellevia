<script lang="ts">
	import JourneyCard from "$lib/components/self/JourneyCard.svelte";
	import JourneySearcher from "$lib/components/self/JourneySearcher.svelte";
	import { getErrorMessage } from "$lib/functions";

  let results: ApiGetJourneys | undefined = $state()
</script>

<main class="w-full h-svh flex flex-col items-center {results ? 'justify-start lg:flex-row' : 'justify-center'} bg-white">
  <div class="w-full max-w-100">
    <JourneySearcher bind:results={results}/>
  </div>
  {#if results}
    <div class="gap-2 h-full w-full flex flex-col items-center lg:justify-center-safe m-2 lg:mr-0 p-2 lg:overflow-y-scroll">
      {#if results.error}
        <div class="bg-red-200 w-fit p-2 border-2 border-red-500">
          {#if getErrorMessage(results.error.id)}
            {getErrorMessage(results.error.id)}
          {:else}
            {results.error.id} <br>
            {results.error.message}
          {/if}
        </div>
      {/if}
      {#if results.disruptions.length > 0}
        <div class="bg-orange-300 w-fit p-2 border-2 border-orange-500">
          <!-- Todo: Add disruptions -->
        </div>
      {/if}
      {#each results.journeys as journey}
        <JourneyCard journey={journey} />
      {/each}
    </div>
  {/if}
</main>