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
    background: #eee;
    margin: 10px 0;
    
  }
  .number-input {
    background: none;
    text-align: center;
    border: 0;
    padding: 10px;
  }
</style>

<div class="number">
  {#if editable}
    <input type="text" class="number-input" bind:value={number} />
  {:else}
    {number}
  {/if}
</div>
