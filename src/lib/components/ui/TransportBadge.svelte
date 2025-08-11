<script lang="ts">
  interface Props {
    color: string;
    textColor: string;
    code: string;
  }
  let {color, textColor, code}: Props = $props()
</script>

<span
style="background-color: #{color}; color: #{textColor};"
class="p-1"
>
  {code}
</span>