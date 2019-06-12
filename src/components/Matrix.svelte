<script>
  import { createEventDispatcher } from 'svelte';
  import Matrix from 'src/lib/matrix'

  export let editable = false
  export let fixed = false
  export let data = [[]]

  const dispatch = createEventDispatcher()
  
  const createClickHandler = (modifyMatrix) => () => {
    matrix = modifyMatrix()
    data = matrix.getData()
    dispatch('change', { data})
  }

  let matrix
  let rows

  $: {
    matrix = new Matrix(data)
    rows = matrix.getRows(editable ? 1 : 0)
  }
</script>

<style>
  .matrix {
    border-radius: 1px;
    display: inline-block;
    position: relative;
  }

  .matrix-table {
    position: relative;
    margin: 0 30px;
    padding: 0;
    border-spacing: 0;
    border-collapse: separate;
    background: #fff;
    box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1);
  }

  .matrix-table tr {
    display: flex;
  }

  .matrix-table tr:hover {
    background: #f0f0f0;
  }

  .matrix-cell {
    padding: 20px;
    margin: 0;
  }
  .matrix-cell__input {
    margin: 0;
    text-align: center;
    border: none;
  }
  .matrix-cell__create-row {
    width: 100%;
    margin: 0;
    padding: 0;
    background: #eee;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.5s;
  }
  .matrix-cell__create-column {
    position: absolute;
    width: 30px;
    top: 0;
    bottom: 0;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .matrix-cell__create-column--left {
    left: -30px;
  }

  .matrix-cell__create-column--right {
    right: -30px;
  }

  .matrix:hover .matrix-cell__create-row,
  .matrix:hover .matrix-cell__create-column {
    opacity: 1;
  }
</style>

<div class="matrix">
  <table class="matrix-table table">
		{#if editable}
			<tr>
				<td></td>
				<td 
						colspan="{matrix.width}" 
						class="matrix-cell__create-row" 
						on:click={createClickHandler(matrix.addRowAbove)}>
					+
				</td>
				<td></td>
			</tr>
      <tr>
          <td
              rowspan={matrix.height}
              class="matrix-cell__create-column  matrix-cell__create-column--left"
              on:click={createClickHandler(matrix.addColumnLeft)}
          >
              +
          </td>
          {#each matrix.getRow(0) as value}
            <td class="matrix-cell">
              <input type="text" class="matrix-cell__input" bind:value={value} />
            </td>
          {/each}
          <td
              rowspan={matrix.height}
              class="matrix-cell__create-column  matrix-cell__create-column--right"
              on:click={createClickHandler(matrix.addColumnRight)}
          >
              +
          </td>
      </tr>
		{/if}
		{#each rows as row}
			<tr>
					{#each row as value}
						<td class="matrix-cell">
              {#if editable}
                <input class="matrix-cell__input" type="number" bind:value={value} />
              {:else}
                {value}
              {/if}
						</td>
					{/each}
			</tr>
		{/each}
		{#if editable}
		<tr>
			<td></td>
			<td
					colspan="{matrix.width}"
					class="matrix-cell__create-row"
					on:click={createClickHandler(matrix.addRowBelow)}
      >
				+
			</td>
			<td></td>
		</tr>
		{/if}
	</table>
</div>
