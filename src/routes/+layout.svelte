<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/images/logo-small.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script defer src="https://analytics.bdn-fr.xyz/script.js" data-website-id="d7a48764-bd4d-4ffc-bbe4-bea51d5f8b40"></script>
</svelte:head>

{@render children?.()}
<!-- Todo: Footer with credits and more -->