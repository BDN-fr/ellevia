<script lang="ts">
  interface Props {
    journey: Journey;
  }
  let {journey}: Props = $props()

  function parseDate(date: String): Date {
    // "20250809T170707"
    // "2025-08-09T17:07:07"
    return new Date(date.slice(0,4) + "-" + date.slice(4,6) + "-" + date.slice(6,11) + ":" + date.slice(11,13) + ":" + date.slice(13,15))
  }

  function dateTimeString(date: String): String {
    return date.slice(9,11) + ':' + date.slice(11,13)
  }

  function durationString(duration:number): String {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    return hours > 0 ? `${hours}h${minutes.toString().padStart(2, '0')}` : `${minutes}min`;
  }
</script>

<div class="border border-black p-2">
  <div>
    {dateTimeString(journey.departure_date_time)} → {dateTimeString(journey.arrival_date_time)} - {durationString(journey.duration)}
  </div>
  <div class="p-2 gap-1 flex flex-wrap">
    {#each journey.sections as section}
      {#if section.type == "public_transport" && section.display_informations}
        <span
        style="background-color: #{section.display_informations.color}; color: #{section.display_informations.text_color};"
        class="p-1"
        >
          {section.display_informations.code}
        </span>
      {/if}
    {/each}
  </div>
</div>