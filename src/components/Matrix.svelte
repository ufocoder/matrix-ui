<script>
  import { beforeUpdate, afterUpdate } from 'svelte';
  import Matrix from '../lib/matrix'

  export let controls = false;
  export let data = [
    [1,1],
    [1,1]
  ];

  let matrix = new Matrix(data);
  
  $: matrixWidth = matrix.width
  $: matrixHeight = matrix.height
  $: matrixFirstRow = matrix.getRow(0)
  $: matrixRows = matrix.getRows(controls ? 1 : 0)
  
  const handleAddRowAboveClick = () => matrix = matrix.addRowAbove()
  const handleAddRowBelowClick = () => matrix = matrix.addRowBelow()
  const handleAddColumnLeftClick = () => matrix = matrix.addColumnLeft()
  const handleAddColumnRightClick = () => matrix = matrix.addColumnRight()

</script>

<style>
  .matrix {
  }
  .matrix-table {
    padding: 10px;
    position: relative;
    border-radius: 5px;
    margin: 10px;
    background: #fff;
    box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1);
    padding: 0;
    border-spacing: 0;
    border-collapse: separate;
  }
  .matrix-cell {
    margin: 0;
  }
  .matrix-cell__input {
    margin: 0;
  }
  .matrix-cell__create-row {
    width: 100%;
    background: #ccc;
  }
  .matrix-cell__create-column {
    width: 100%;
    background: #ccc;
  }
</style>

<div class="matrix">
  {matrixWidth} / {matrixHeight}
	<table class="matrix-table table">
		{#if controls}
			<tr>
				<td></td>
				<td 
						colspan="{matrixWidth}" 
						class="matrix-cell__create-row" 
						on:click={handleAddRowAboveClick}>
					add row
				</td>
				<td></td>
			</tr>
      <tr>
          <td rowspan={matrixHeight} on:click={handleAddColumnLeftClick}>add col</td>
          {#each matrixFirstRow as col}
            <td class="matrix-cell">
              <input class="matrix-cell__input" type="number" bind:value={col} />
            </td>
          {/each}
          <td rowspan={matrixHeight} on:click={handleAddColumnRightClick}>add col</td>
      </tr>
		{/if}
		{#each matrixRows as row}
			<tr>
					{#each row as col}
						<td class="matrix-cell">
							<input class="matrix-cell__input" type="number" bind:value={col} />
						</td>
					{/each}
			</tr>
		{/each}
		{#if controls}
		<tr>
			<td></td>
			<td 
					colspan="{matrixWidth}" 
					class="matrix-cell__create-row" 
					on:click={handleAddRowBelowClick}>
      >
				add row
			</td>
			<td></td>
		</tr>
		{/if}
	</table>
</div>
