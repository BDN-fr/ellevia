<script lang="ts">
	import Button from "../ui/Button.svelte";

  interface Props {
    journey: Journey;
  }
  let {journey}: Props = $props()

  let expend = $state(false)

  $effect(() => {
    expend = false
  })

  function dateTimeString(date: String): String {
    return date.slice(9,11) + ':' + date.slice(11,13)
  }

  function durationString(duration:number): String {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return hours > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${minutes}min`;
  }

  function walkLengthSum(path: PathInstruction[]): number {
    var sum = 0
    path.forEach(e => {
      sum += e.length
    });
    return sum
  }
</script>

<div class="border border-black p-2 w-full {expend ? 'max-w-160' : 'max-w-80'}">
  <div>
    {dateTimeString(journey.departure_date_time)} → {dateTimeString(journey.arrival_date_time)} - {durationString(journey.duration)}
  </div>
  <div class="p-2 gap-2 flex flex-wrap">
    {#each journey.sections as section}
      {#if section.type == "public_transport" && section.display_informations}
        <span
        style="background-color: #{section.display_informations.color}; color: #{section.display_informations.text_color};"
        class="p-1"
        >
          {section.display_informations.code}
        </span>
      {/if}
    {/each}
  </div>
  {#if expend}
    <div class="flex flex-col gap-2 mb-2">
      {#each journey.sections as section}
        {#if section.type == "waiting"}
          Attente {durationString(section.duration)} <br>
        {:else if section.type == "transfer"}
          Rejoindre {section?.to?.name} en {durationString(section.duration)} <br>
        {:else}
          <span class="text-neutral-700">{dateTimeString(section.departure_date_time)} - {section.from.name} <br></span>
          <div class="min-h-6">
            {#if section.type == "public_transport" && section.display_informations}
              {section.display_informations.commercial_mode}
              <span
              style="background-color: #{section.display_informations.color}; color: #{section.display_informations.text_color};"
              class="p-1"
              >
                {section.display_informations.code}
              </span>
              Direction {section.display_informations.direction}
            {:else if section.type == "non_pt_walk" || section.type == "street_network"}
              Marche {walkLengthSum(section.path)}m
              <div class="bg-neutral-100 p-2">
                {#each section.path as instruction}
                  <p>{instruction.instruction}</p>
                {/each}
              </div>
            {/if}
          </div>
          <span class="text-neutral-700">{dateTimeString(section.arrival_date_time)} - {section.to.name} <br></span>
          <!-- {section.from.name} → {section.to.name}
          {dateTimeString(section.departure_date_time)} → {dateTimeString(section.arrival_date_time)} -->
        {/if}
      {/each}
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