<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/images/logo-small.png';
	import Footer from '$lib/components/self/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script
		defer
		src="https://analytics.bdn-fr.xyz/script.js"
		data-website-id="816340b5-915b-4e28-aec2-6216b3e290f1"
	></script>
</svelte:head>

{@render children?.()}
<Footer />
