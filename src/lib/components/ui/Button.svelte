<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	interface Props extends HTMLButtonAttributes {
		principal?: boolean;
		children?: any;
	}
	let { principal = true, children, ...rest }: Props = $props();
</script>

<button
	{...rest}
	class={["w-full cursor-pointer border border-black p-2", principal
		? 'bg-black text-white hover:bg-white hover:text-black'
		: 'bg-white text-black hover:bg-black hover:text-white',
		rest.class]}
	type={rest.type ? rest.type : 'button'}
>
	{@render children?.()}
</button>
