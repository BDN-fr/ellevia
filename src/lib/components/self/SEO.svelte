<script lang="ts">
  let {
    title="Ellevia",
    description="Trouvez vos trajets en transports en commun dans la MEL plus simplement et plus rapidement. Toutes les informations dont vous avez besoin sans devoir utiliser l'horrible aplication Ilevia 🤯",
    url = "https://ellevia.bdn-fr.xyz",
    image = "https://github.com/BDN-fr/ellevia/blob/main/static/images/logo-small.png?raw=true",
    colorTheme = "#FFFFFF"
  } = $props()
</script>

<svelte:head>
  <title>{title}</title>
  <meta property="og:title" content={title} />
  <meta name="twitter:title" content={title} />
  <meta name="description" content={description} />
  <meta property="og:description" content={description} />
  <meta name="twitter:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={image} />
  <meta name="theme-color" content={colorTheme}>
  <meta name="keywords" content="Lille, MEL, Métropôle Lilloise, Transport en commun, Bus, Train, Tram, Métro, Autocar, Ilevia" />
  <meta name="author" content="BDN_fr" />
  <!-- <meta name="twitter:card" content="summary_large_image" /> -->
  <meta property="og:type" content="website" />
</svelte:head>