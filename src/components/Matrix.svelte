<script>
  import { createEventDispatcher } from 'svelte';
  import Matrix from 'src/lib/matrix'

  export let editable = false
  export let fixed = false
  export let data = [[1,2],[3,4]]

  const dispatch = createEventDispatcher()
  
  const createClickHandler = (modifyMatrix) => () => {
    matrix = modifyMatrix()
    data = matrix.getData()
    dispatch('change', { data })
  }

  let matrix
  let rows

  $: {
    matrix = new Matrix(data)
    rows = matrix.getRows()
  }
</script>

<style>
  .matrix {
    position: relative;
    display: inline-block;
    margin: 30px;
  }

  .matrix-table {
    position: relative;
    padding: 0;
    border-spacing: 0;
    border-collapse: separate;
    background: #fff;
    /* box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1); */
  }

  .matrix-cell {
    border-left: 1px solid #eee;
    padding: 0;
    margin: 0;
    min-width: 40px;
    line-height: 40px;
    text-align: center;

  }
  .matrix-cell:last-child {
    border-right: 1px solid #eee;
  }
  .matrix-row {
    display: block;
    border-bottom: 1px solid #eee;
  }
  .matrix-row:first-child {
    border-top: 1px solid #eee;
  }
  .matrix-cell__input {
    margin: 0;
    text-align: center;
    padding: 10px;
    border: none;
    width: 100%;
    height: 100%;
  }
  .matrix__create-row {
    position: absolute;
    width: 100%;
    background: #eee;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }
  .matrix__create-row--above {
    top: -30px;
  } 
  .matrix__create-row--below {
    bottom: -30px;
    
  } 
  .matrix__create-column {
    text-align: center;
    background: #eee;
    position: absolute;
    top: 0;
    width: 30px;
    line-height: 30px;
    bottom: 0;
  }
  .matrix__create-column--left {
    left: -30px;
    writing-mode: vertical-lr;
    transform: rotate(-180deg);
  }
  .matrix__create-column--right {
    right: -30px;
    writing-mode: vertical-rl;
  }
  .matrix__create-column:hover,
  .matrix__create-row:hover {
    cursor: pointer;
  } 
</style>

<div class="matrix">
  {#if editable}
    <div 
      class="matrix__create-row  matrix__create-row--above" 
      on:click={createClickHandler(matrix.addRowAbove)}>
      add row
    </div>
    <div 
      class="matrix__create-column matrix__create-column--left" 
      on:click={createClickHandler(matrix.addColumnLeft)}>
      add column
    </div>
    <div 
      class="matrix__create-column matrix__create-column--right" 
      on:click={createClickHandler(matrix.addColumnRight)}>
      add column
    </div>
    <div
      class="matrix__create-row matrix__create-row--below" 
      on:click={createClickHandler(matrix.addRowBelow)}>
      add row
    </div>
  {/if}
  <table class="matrix-table">
		{#each rows as row}
			<tr class="matrix-row">
					{#each row as value}
						<td class="matrix-cell">
              {#if editable}
                <input type="text" class="matrix-cell__input" bind:value={value} />
              {:else}
                {value}
              {/if}
						</td>
					{/each}
			</tr>
		{/each}
	</table>
</div>
