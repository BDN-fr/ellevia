<script lang="ts">
	import Button from "../ui/Button.svelte";
	import Sections from "../ui/Sections.svelte";
  import {durationString, dateTimeString} from "$lib/functions"
	import TransportBadge from "../ui/TransportBadge.svelte";

  interface Props {
    journey: Journey;
  }
  let {journey}: Props = $props()

  let expend = $state(false)
</script>

<div class="border border-black p-2 w-full {expend ? 'max-w-160' : 'max-w-80'}">
  <div>
    {dateTimeString(journey.departure_date_time)} → {dateTimeString(journey.arrival_date_time)} - {durationString(journey.duration)}
  </div>
  {#if !journey.tags.find((v, i, obj) => v == 'non_pt')}
      <div class="p-2 gap-2 flex flex-wrap">
      {#each journey.sections as section}
        {#if section.type == "public_transport" || section.type == "on_demand_transport" && section.display_informations}
          <TransportBadge color={section.display_informations.color} textColor={section.display_informations.text_color} code={section.display_informations.code} />
        {/if}
      {/each}
    </div>
  {/if}
  Marche: {durationString(journey.durations.walking)}
  {#if expend}
    <div class="flex flex-col gap-2 my-2 pt-2 border-t border-black ">
      <Sections sections={journey.sections}/>
    </div>
  {/if}
  <div class="w-fit mx-auto left-0 right-0">
    <Button onclick={() => {expend = !expend}} principal={!expend}>
      {#if expend}
        Réduire
      {:else}
        Afficher plus
      {/if}
    </Button>
  </div>
</div>