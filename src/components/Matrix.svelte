<script>
  import Input from 'src/components/Input'
  import Matrix from 'src/lib/matrix'

  export let editable = false
  export let fixed = false
  export let matrix = new Matrix()

  let tableElement

  $: rows = matrix.getRows()

  const createClickHandler = (modifyMatrix) => () => {
    matrix = modifyMatrix()
  }

  const createHandleKeydown = (prevRow, prevCol) => (e) => {
    let nextRow = prevRow
    let nextCol = prevCol
    let stopPropagation = false

    if ('ArrowUp' === e.code && e.metaKey) {
      nextRow = Math.max(0, prevRow - 1)
      stopPropagation = true
    }

    if ('ArrowDown' === e.code && e.metaKey) {
      nextRow = Math.min(matrix.height, prevRow + 1)
      stopPropagation = true
    }

    if ('ArrowLeft' === e.code && e.metaKey) {
      nextCol = Math.max(0, prevCol - 1)
      stopPropagation = true
    }

    if ('ArrowRight' === e.code && e.metaKey) {
      nextCol = Math.min(matrix.width, prevCol + 1)
      stopPropagation = true
    }

    if (stopPropagation) {
      e.stopImmediatePropagation()
    }

    if (prevRow !== nextRow || prevCol !== nextCol) {
      const element = tableElement.querySelector(
        `tr:nth-of-type(${nextRow + 1}) td:nth-of-type(${nextCol + 1}) input`
      )

      if (element) {
        element.focus()
        element.setSelectionRange(0, 0)
      }
    }
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
  }
  .matrix-cell {
    border-left: 1px solid #eee;
    padding: 0;
    margin: 0;
    min-width: 50px;
    line-height: 50px;
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
  {#if matrix}
    {#if editable}
      <div 
        class="matrix__create-row  matrix__create-row--above" 
        on:click={createClickHandler(matrix.addRowAbove)}>
        + add row
      </div>
      <div 
        class="matrix__create-column matrix__create-column--left" 
        on:click={createClickHandler(matrix.addColumnLeft)}>
        + add column
      </div>
      <div 
        class="matrix__create-column matrix__create-column--right" 
        on:click={createClickHandler(matrix.addColumnRight)}>
        + add column
      </div>
      <div
        class="matrix__create-row matrix__create-row--below" 
        on:click={createClickHandler(matrix.addRowBelow)}>
        + add row
      </div>
    {/if}
    <table class="matrix-table" bind:this={tableElement}>
      {#each rows as row, i}
        <tr class="matrix-row">
            {#each row as number, j}
              <td class="matrix-cell">
                {#if editable}
                  <Input bind:value={number} on:keydown={createHandleKeydown(i + 1, j + 1)} />
                {:else}
                  {number}
                {/if}
              </td>
            {/each}
        </tr>
      {/each}
    </table>
  {/if}
</div>
