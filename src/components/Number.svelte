<script>
  import { createEventDispatcher } from 'svelte';

  export let number = 1;
  export let editable = false;

  const dispatch = createEventDispatcher()
  $: {
    dispatch('change', { number })
  }
</script>

<style>
  .number {
    border-radius: 1px;
    display: block;
    padding: 10px;
    background: #fff;
    margin: 10px 0;
  }
  .number-input {
    background: none;
    text-align: center;
    border: 0;
  }
</style>

<div class="number">
  {#if editable}
    <input type="text" class="number-input" bind:value={number} />
  {:else}
    {number}
  {/if}
</div>
