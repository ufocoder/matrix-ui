<script>
  import Generators from 'src/lib/generator'
  import MatrixComponent from 'src/components/Matrix'
  import OperatorComponent from 'src/components/Operator'
  import Operators from 'src/lib/operators'

  let matrixA = Generators.incremental(3, 3)
  let matrixB = Generators.identity(3)
  let matrixC = null
  let canBeCalculated = false

  $: {
    canBeCalculated = Operators.can.add(matrixA, matrixB)
    matrixC = canBeCalculated ? Operators.add(matrixA, matrixB) : null
  }
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
    {#if canBeCalculated}
      <MatrixComponent matrix={matrixC} />
    {:else} 
      Incorrect matrix demensions
    {/if}
  </div>
</div>
