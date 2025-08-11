<script lang="ts">
  import {durationString} from "$lib/functions"
	import Button from "./Button.svelte";

  interface Props {
    section: StreetNetworkSection;
  }
  let {section}: Props = $props()

  let showPath = $state(false)

  function walkLengthSum(path: PathInstruction[]): number {
    var sum = 0
    path.forEach(e => {
      sum += e.length
    });
    return sum
  }
</script>

{#if section.path && section.duration > 0}
  <div class="flex {showPath ? 'flex-col' : 'items-center'} gap-2">
    {durationString(section.duration)} - Marche {walkLengthSum(section.path)}m
    <div class="{showPath ? 'w-full' : 'w-fit'}">
      <Button principal={false} onclick={() => showPath = !showPath}>
        {#if showPath}
          Cacher le chemin
        {:else}
          Afficher le chemin
        {/if}
      </Button>
    </div>
  </div>
  {#if showPath}
    <div class="bg-neutral-100 p-2">
      {#each section.path as instruction}
        <p>{instruction.instruction}</p>
      {/each}
    </div>
  {/if}
{/if}