<script lang="ts">
	import JourneyCard from '$lib/components/self/JourneyCard.svelte';

  interface Props {
    data: Journey
  }
  let {data}: Props = $props()
</script>

<JourneyCard journey={data} />