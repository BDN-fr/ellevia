<script lang="ts">
	import { getJourneys } from "$lib/api";
	import { fade } from "svelte/transition";
	import Button from "../ui/Button.svelte";
	import PlaceInput from "../ui/PlaceInput.svelte";
	import TimePopUp from "./TimePopUp.svelte";

  let {results = $bindable()} = $props()

  const uid = $props.id();

  let from: Place | undefined = $state()
  let to: Place | undefined = $state()

  async function search() {
    if (!from || !to) return
    // if (!from.embedded_type || !to.embedded_type) return
    // if (!from[from.embedded_type] || !to[to.embedded_type]) return
    results = await getJourneys(from?.[from.embedded_type]?.coord, to?.[to.embedded_type]?.coord, datetime, datetimeType)
  }

  let datetime: string | undefined = $state()
  let datetimeType: "departure" | "arrival" = $state('departure')
  let showTimePopUp = $state(false)
</script>

<form onsubmit={search} class="flex flex-col items-center gap-2 w-full p-2" transition:fade>
  <div class="flex flex-col items-center gap-1 w-full">
    <label for="{uid}From">Départ</label>
    <PlaceInput bind:place={from} uid="{uid}From" />
    <label for="{uid}To">Arrivée</label>
    <PlaceInput bind:place={to} uid="{uid}To" />
  </div>
  {datetimeType == "departure" ? 'Départ' : 'Arrivée'}
  {#if datetime}
    le 
    {new Date(datetime).toLocaleDateString()}
    à 
    {new Date(datetime).toLocaleTimeString()}
  {:else}
    maintenant
  {/if}
  <div class="flex w-full gap-2">
    <span class="w-fit"><Button principal={false} onclick={() => showTimePopUp = true}>Horaire</Button></span>
    <span class="w-full grow">
      <Button type="submit">
        Afficher les trajets
      </Button>
    </span>
  </div>
</form>

{#if showTimePopUp}
  <TimePopUp bind:datetime={datetime} bind:datetimeType={datetimeType} bind:opened={showTimePopUp} />
{/if}