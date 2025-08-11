<script lang="ts">
	import DisruptionText from "./DisruptionText.svelte";
	import TransportBadge from "./TransportBadge.svelte";

  interface Props {
    disruption: Disruption;
  }
  let {disruption}: Props = $props()

  const title = disruption.messages.find((v, i, obj) => {
    return v.channel.types[0] == "title" || v.channel.name == "titre"
  })?.text

  let impacted_objects: Line[] = $state([])
  disruption.impacted_objects.forEach(e => {
    var obj = e.pt_object?.[e.pt_object?.embedded_type]
    if (obj) {
      impacted_objects.push(obj)
    }
  });
</script>

<div class="flex flex-col">
  <h2 class="text-xl ml-4">{title}</h2>  
  <div class="flex w-fit gap-2 items-center my-2">
    Affecte
    {#each impacted_objects as obj}
      <TransportBadge color={obj.color} textColor={obj.text_color} code={obj.code} />
    {/each}
  </div>
  {#each disruption.messages as message}
    {#if message.channel.content_type == "text/html"}
      <DisruptionText text={message.text} />
    {/if}
  {/each}
</div>