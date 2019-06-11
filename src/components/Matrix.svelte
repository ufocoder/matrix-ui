<script>
  import Matrix from 'src/lib/matrix'

  export let editable = false;
  export let data = [
    [1,1],
    [1,1]
  ];

  let matrix = new Matrix(data);
  
  $: matrixWidth = matrix.width
  $: matrixHeight = matrix.height
  $: matrixFirstRow = matrix.getRow(0)
  $: matrixRows = matrix.getRows(editable ? 1 : 0)
  
  const handleAddRowAboveClick = () => matrix = matrix.addRowAbove()
  const handleAddRowBelowClick = () => matrix = matrix.addRowBelow()
  const handleAddColumnLeftClick = () => matrix = matrix.addColumnLeft()
  const handleAddColumnRightClick = () => matrix = matrix.addColumnRight()

</script>

<style>
  .matrix {
    display: inline-block;
    position: relative;
    background: #fff;
    box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1);
  }

  .matrix-table {
    position: relative;
    margin: 0 30px;
    padding: 0;
    border-spacing: 0;
    border-collapse: separate;
  }

  .matrix-table tr {
    display: flex;
  }

  .matrix-cell {
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
						colspan="{matrixWidth}" 
						class="matrix-cell__create-row" 
						on:click={handleAddRowAboveClick}>
					+
				</td>
				<td></td>
			</tr>
      <tr>
          <td
              rowspan={matrixHeight}
              class="matrix-cell__create-column  matrix-cell__create-column--left"
              on:click={handleAddColumnLeftClick}
          >
              +
          </td>
          {#each matrixFirstRow as col}
            <td class="matrix-cell">
              <input class="matrix-cell__input" type="number" bind:value={col} />
            </td>
          {/each}
          <td
              rowspan={matrixHeight}
              class="matrix-cell__create-column  matrix-cell__create-column--right"
              on:click={handleAddColumnRightClick}
          >
              +
          </td>
      </tr>
		{/if}
		{#each matrixRows as row}
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
					colspan="{matrixWidth}"
					class="matrix-cell__create-row"
					on:click={handleAddRowBelowClick}
      >
				+
			</td>
			<td></td>
		</tr>
		{/if}
	</table>
</div>
