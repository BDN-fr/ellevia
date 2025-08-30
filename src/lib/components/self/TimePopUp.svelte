<script lang="ts">
	import { page } from "$app/state";
	import { getCurrentIsoTime } from "$lib/functions";
	import Button from "../ui/Button.svelte";
	import PopUp from "../ui/PopUp.svelte";

  let productionRange = page.data.productionRange

  let {datetime = $bindable(), datetimeType = $bindable(), opened = $bindable(true)} = $props()
  if (!datetime) {
    setCurrentDatetime() 
  }

  function setCurrentDatetime() {
    datetime = getCurrentIsoTime()
  }
</script>

<PopUp bind:opened={opened}>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2 w-full">
      <Button principal={datetimeType=="departure"} onclick={() => datetimeType = "departure"}>Départ</Button>
      <Button principal={datetimeType=="arrival"} onclick={() => datetimeType = "arrival"}>Arrivée</Button>
    </div>
    <div>
      Date et heure : <input type="datetime-local" min={productionRange.min} max={productionRange.max} bind:value={datetime}>
    </div>
    <Button principal={false} onclick={setCurrentDatetime}>
      Date et heure actuelle
    </Button>
  </div>
</PopUp>