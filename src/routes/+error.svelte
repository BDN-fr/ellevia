<script>
  import { page } from "$app/state";
</script>

<main class="flex items-center justify-center min-h-svh max-h-svh">
  <div class="border border-black p-2 m-2 text-center">
    <h1>Erreur {page.status}</h1>
    <p>{page.error?.message}</p>
    <a href="/">Revenir à l'acceuil</a>
  </div>
</main>