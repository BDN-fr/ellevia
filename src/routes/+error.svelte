<script>
	import { page } from '$app/state';
</script>

<main class="flex max-h-svh min-h-svh items-center justify-center">
	<div class="m-2 border border-black p-2 text-center">
		<h1>Erreur {page.status}</h1>
		<p>{page.error?.message}</p>
		<a href="/">Revenir à l'acceuil</a>
	</div>
</main>
