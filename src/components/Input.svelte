<script>
  import { afterUpdate } from 'svelte';

  export let value = 1;

  let element
  let selectionStart
  let selectionEnd

  afterUpdate(() => {
    element.setSelectionRange(selectionStart, selectionEnd);
  })

  const handleKeydown = function (e) {
    selectionStart = this.selectionStart
    selectionEnd = this.selectionEnd

    if ('ArrowUp' === e.code) {
      value += 1
      e.preventDefault()
    }

    if ('ArrowDown' === e.code) {
      value -= 1
      e.preventDefault()
    }
  }
</script>

<style>
  .input {
    background: none;
    text-align: center;
    border: 0;
    padding: 10px;
    height: 70px;
    line-height: 70px;
    width: 100%;
  }
  .input:focus {
    outline-color: #807fe2;
    outline-style: solid;
    outline-width: 2px;
  }
</style>

<input 
  class="input" 
  type="text"
  pattern="-?[0-9]"
  bind:this={element} 
  bind:value={value} 
  on:keydown
  on:focus
  on:blur
  on:keydown={handleKeydown} />
