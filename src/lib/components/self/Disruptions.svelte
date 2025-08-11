<script lang="ts">
	import DisruptionCard from "../ui/Disruption.svelte";

  interface Props {
    disruptions: Disruption[]
  }
  let {disruptions}: Props = $props()
</script>

<div class="bg-orange-200 w-fit p-2 border-2 border-orange-500 flex flex-col gap-4">
  Possible(s) perturbation(s)
  {#each disruptions as dis}
    <DisruptionCard disruption={dis} />
  {/each}
</div>