<script>
  import Generators from 'src/lib/generator'
  import MatrixComponent from 'src/components/Matrix'
  import OperatorComponent from 'src/components/Operator'

  let matrixA = Generators.incremental(3, 3)
  let matrixB = Generators.identity(3)

  $: canBeMultiplied = matrixA.canMultiplyOnMatrix(matrixB)
  $: matrixC = canBeMultiplied ? matrixA.multiply(matrixB) : null

</script>

<style>
.expression {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.expression-operator {
  flex: 1;
}
.expression-operand {
  flex: 1;
}
</style>

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
    {#if canBeMultiplied}
      <MatrixComponent matrix={matrixC} />
    {:else} 
      Not allowed
    {/if}
  </div>
</div>
