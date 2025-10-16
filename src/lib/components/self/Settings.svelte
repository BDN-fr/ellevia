<script lang="ts">
	import { SettingsIcon } from "@lucide/svelte";
	import Button from "../ui/Button.svelte";
</script>

<div class="absolute top-1 left-1 w-12 h-12">
  <Button class="h-full flex justify-center items-center p-1/4" principal={false}>
    <SettingsIcon class="size-full" />
  </Button>
</div>