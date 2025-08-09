<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  interface Props extends HTMLButtonAttributes {
    principal?: boolean;
    children?: any;
  }
  let {principal=true, children, ...rest}: Props = $props()
</script>

<button class="p-2 cursor-pointer border border-black w-full {principal ? 'bg-black text-white hover:bg-white hover:text-black' : 'bg-white text-black hover:bg-black hover:text-white'}" {...rest}>
  {@render children?.()}
</button>