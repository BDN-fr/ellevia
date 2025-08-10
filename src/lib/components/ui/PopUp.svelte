<script lang="ts">
	import { clickoutside } from "@svelte-put/clickoutside";
	import type { SvelteHTMLElements } from "svelte/elements";

  let {children, opened = $bindable(true), ...rest}: SvelteHTMLElements['div'] & { opened: boolean } = $props()

  let canClose = false
  setTimeout(() => {
    canClose = true
  }, 500)

  function close() {
    if (!canClose) return
    opened = false
  }
</script>

{#if opened}
  <div class="z-50 absolute size-full left-0 top-0 bg-neutral-500/50 flex items-center justify-center" {...rest}>
    <div use:clickoutside onclickoutside={close} class="size-fit max-size-full border border-black bg-white p-2">
      {@render children?.()}
    </div>
  </div>
{/if}