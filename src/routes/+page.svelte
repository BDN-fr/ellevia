<script lang="ts">
	import Disruptions from "$lib/components/self/Disruptions.svelte";
	import JourneyCard from "$lib/components/self/JourneyCard.svelte";
	import JourneySearcher from "$lib/components/self/JourneySearcher.svelte";
	import { getErrorMessage } from "$lib/functions";
  import logo from "$lib/assets/images/logo.png";
	import Seo from "$lib/components/self/SEO.svelte";

  let results: ApiGetJourneys | undefined = $state()
</script>

<Seo />

<main class="w-full min-h-svh lg:h-svh flex flex-col items-center {results ? 'justify-start lg:flex-row' : 'justify-center'} bg-white">
  <div class="w-full max-w-100 flex flex-col gap-4 {results ? 'mt-4 lg:mt-0 lg:ml-8' : ''}">
    <a href="/" class="w-1/2 mx-auto left-0 right-0" onclick={() => {results = undefined}}><img src={logo} alt="logo" /></a>
    <JourneySearcher bind:results={results}/>
  </div>
  {#if results}
    <div class="gap-2 h-full w-full flex flex-col items-center lg:justify-center-safe m-2 pb-8 lg:mr-0 p-2 lg:overflow-y-scroll">
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
        <Disruptions disruptions={results.disruptions} />
      {/if}
      {#each results.journeys as journey (journey)}
        <JourneyCard journey={journey} />
      {/each}
    </div>
  {/if}
</main>