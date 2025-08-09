<script>
	import JourneySearcher from "$lib/components/self/JourneySearcher.svelte";

  let results = $state()
</script>

<!-- <main class="w-full h-svh flex flex-col items-center md:justify-center {!results ? 'justify-center md:items-center' : 'md:items-start'}">
  <div class="w-full max-w-100">
    <JourneySearcher bind:results={results}/>
  </div>
</main> -->
<main class="w-full h-svh flex flex-col items-center {results ? 'justify-start lg:flex-row' : 'justify-center'} bg-white">
  <div class="w-full max-w-100">
    <JourneySearcher bind:results={results}/>
  </div>
</main>