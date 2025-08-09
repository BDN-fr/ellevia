<script lang="ts">
	import JourneyCard from "$lib/components/self/JourneyCard.svelte";
	import JourneySearcher from "$lib/components/self/JourneySearcher.svelte";

  let results: ApiGetJourneys | undefined = $state()
</script>

<main class="w-full h-svh flex flex-col items-center {results ? 'justify-start lg:flex-row' : 'justify-center'} bg-white">
  <div class="w-full max-w-100">
    <JourneySearcher bind:results={results}/>
  </div>
  {#if results}
    {#if results.disruptions.length > 0}
      <div class="bg-yellow-500">
        <!-- todo -->
      </div>
    {/if}
    <div class="gap-2 size-full flex flex-col items-center lg:justify-center-safe m-2 p-2">
      {#each results.journeys as journey}
        <JourneyCard journey={journey} />
      {/each}
    </div>
  {/if}
</main>