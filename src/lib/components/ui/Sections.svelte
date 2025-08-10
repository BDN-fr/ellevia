<script lang="ts">
  import {durationString, dateTimeString} from "$lib/functions"
	import WalkSection from "./WalkSection.svelte";

  interface Props {
    sections: Section[]
  }
  let {sections}: Props = $props()

  function showFrom(i: number): boolean {
    var prev = sections[i-1]
    if (i == 0) return true // First section, show
    if (!Object.hasOwn(prev, 'to')) return true // Previous section don't have a "to" text, show
    if (prev.type == 'transfer') return true // Transfers with a "to" don't have a message, show
    return false
  }
</script>

{#each sections as section, i}
  {#if section.type == "waiting"}
    {durationString(section.duration)} - Attendre <br>
  {:else if section.type == "transfer"}
    {durationString(section.duration)} - Rejoindre {section.to?.name} <br>
  {:else}
    {#if showFrom(i)}
      <span class="text-neutral-600">{dateTimeString(section.departure_date_time)} - {section.from.name} <br></span>
    {/if}
    <div class="min-h-6">
      {#if section.type == "public_transport" || section.type == "on_demand_transport" && section.display_informations}
        {durationString(section.duration)} - {section.display_informations.commercial_mode}
        <span
        style="background-color: #{section.display_informations.color}; color: #{section.display_informations.text_color};"
        class="p-1"
        >
          {section.display_informations.code}
        </span>
        Direction {section.display_informations.direction}
        {#if section.type == "on_demand_transport"}
          A réserver <a href="https://reservation.ilevia.fr">ici</a>
        {/if}
      {:else if section.type == "non_pt_walk" || section.type == "street_network"}
        <WalkSection section={section} />
      {/if}
    </div>
    <span class="text-neutral-600">{dateTimeString(section.arrival_date_time)} - {section.to.name} <br></span>
  {/if}
{/each}