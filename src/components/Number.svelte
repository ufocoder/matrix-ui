<script>
  import Input from 'src/components/Input'

  export let number = 1;
  export let editable = false;
</script>

<style>
  .number {
    border-radius: 1px;
    display: block;
    background: #eee;
    margin: 10px 0;
  }
</style>

<div class="number">
  {#if editable}
    <Input bind:value={number} />
  {:else}
    {number}
  {/if}
</div>
