<script>
  import Generators from 'src/lib/generator'
  import MatrixComponent from 'src/components/Matrix'
  import OperatorComponent from 'src/components/Operator'

  let matrixA = Generators.incremental(3, 3)
  let matrixB = Generators.identity(3)

  $: canBeAdded = matrixA.canAddToMatrix(matrixB)
  $: matrixC = canBeAdded ? matrixA.add(matrixB) : null
</script>

<h2>Add matrix to matrix </h2>

<div class="expression">
  <div class="expression-operand">
    <MatrixComponent bind:matrix={matrixA} editable />
  </div>
  <div class="expression-operator">
    <OperatorComponent operator="+" />
  </div>
  <div class="expression-operand">
    <MatrixComponent bind:matrix={matrixB} editable />
  </div>

  <div class="expression-operator">
    <OperatorComponent operator="=" />
  </div>
  <div class="expression-operand">
    {#if canBeAdded}
      <MatrixComponent matrix={matrixC} />
    {:else} 
      Incorrect matrix demensions
    {/if}
  </div>
</div>
