<script lang="ts">
	import { productionRange } from "$lib/api";
	import Button from "../ui/Button.svelte";
	import PopUp from "../ui/PopUp.svelte";

  let {datetime = $bindable(), datetimeType = $bindable(), opened = $bindable(true)} = $props()
  if (!datetime) {
    const now: Date = new Date();
    const offset: number = now.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    datetime = new Date(now.getTime() - offset).toISOString().slice(0,16);
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
  </div>
</PopUp>