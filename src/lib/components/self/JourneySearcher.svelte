<script lang="ts">
	import { getJourneys } from "$lib/api";
	import Button from "../ui/Button.svelte";
	import PlaceInput from "../ui/PlaceInput.svelte";

  let {results = $bindable()} = $props()

  let from: Place | undefined = $state()
  let to: Place | undefined = $state()

  async function search() {
    if (!from || !to) return
    // if (!from.embedded_type || !to.embedded_type) return
    // if (!from[from.embedded_type] || !to[to.embedded_type]) return
    results = await getJourneys(from?.[from.embedded_type]?.coord, to?.[to.embedded_type]?.coord) // fuck ts
    console.log(results)
  }
</script>

<form onsubmit={search} class="flex flex-col items-center gap-2 w-full p-2">
  <div class="flex gap-1 w-full">
    Départ <PlaceInput bind:place={from} />
  </div>
  <div class="flex gap-1 w-full">
    Arrivée <PlaceInput bind:place={to} />
  </div>
  <div class="w-fit">
    <Button type="submit">
      Afficher les trajets
    </Button>
  </div>
</form>