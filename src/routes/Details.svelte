<script>
  import Component from 'src/components/Matrix'
  import Generators from 'src/lib/generator'
  import Analyzers from 'src/lib/analyzer'
  import Operators from 'src/lib/operators'

  const generators = Object.keys(Generators)
  const analyzers = Object.keys(Analyzers)

  const handleGeneratorClick = (generator) => () => {
    matrix = Generators[generator](3, 3)
  }

  let matrix = Generators.identity(3)
  let canBeCalculated = false
  let determinant = null
  let classifiers = []

  $: {
    canBeCalculated = Operators.can.determinant(matrix)
    determinant = canBeCalculated ? Operators.determinant(matrix) : null
    classifiers = analyzers.filter(analyzer => Analyzers[analyzer](matrix))
  }
</script>

<h2>Matrix</h2>

<Component bind:matrix={matrix} editable />

<h3>Details</h3>

<div>
  {#each classifiers as classifier}
    <span class="chip">{classifier}</span>
  {/each}
</div>

<h3>Generators</h3>

<div>
  {#each generators as generator}
    <span class="chip" on:click={handleGeneratorClick(generator)}>
      {generator}
    </span>
  {/each}
</div>

<h3>Determinant</h3>

<p>
  {#if canBeCalculated}
    {determinant}
  {:else}
    Incorrect matrix demensions
  {/if}
</p>

