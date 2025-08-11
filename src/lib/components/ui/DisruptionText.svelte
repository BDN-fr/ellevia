<script lang="ts">
  import { onMount } from 'svelte'

  let {text}: {text: string} = $props()
  let textElement: HTMLParagraphElement

  onMount(() => {
    textElement.innerHTML = text
  })
</script>

<p bind:this={textElement}></p>