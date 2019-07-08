<script>
  import Generators from 'src/lib/generator'
  import MatrixComponent from 'src/components/Matrix'
  import OperatorComponent from 'src/components/Operator'
  import Operators from 'src/lib/operators'

  let matrixA = Generators.incremental(3, 3)
  let matrixB = Generators.identity(3)

  $: {
    canBeCalculated = Operators.can.multiply(matrixA, matrixB)
    matrixC = canBeCalculated ? Operators.multiply(matrixA, matrixB) : null
  }
</script>


<h2>Multiply matrix on matrix </h2>

<div class="expression">
  <div class="expression-operand">
    <MatrixComponent bind:matrix={matrixA} editable />
  </div>
  <div class="expression-operator">
    <OperatorComponent operator="x" />
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
