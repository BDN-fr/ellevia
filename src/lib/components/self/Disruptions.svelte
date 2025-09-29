<script lang="ts">
	import DisruptionCard from '../ui/Disruption.svelte';

	interface Props {
		disruptions: Disruption[];
	}
	let { disruptions }: Props = $props();
</script>

<div class="flex w-fit flex-col gap-4 border-2 border-orange-500 bg-orange-200 p-2">
	Possible(s) perturbation(s)
	{#each disruptions as dis}
		<DisruptionCard disruption={dis} />
	{/each}
</div>
