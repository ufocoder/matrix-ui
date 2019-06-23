<script>
  import Generators from 'src/lib/generator'
  import MatrixComponent from 'src/components/Matrix'
  import NumberComponent from 'src/components/Number'
  import OperatorComponent from 'src/components/Operator'

  let matrixA = Generators.incremental(3, 3)

  $: isSquareMatrix = matrixA.isSquareMatrix()
  $: determinant = isSquareMatrix ? matrixA.getDeterminant() : null

</script>


<h2>Get a determinant</h2>

<div class="expression">
  <div class="expression-operand">
    <MatrixComponent bind:matrix={matrixA} editable />
  </div>

  <div class="expression-operator">
    <OperatorComponent operator="=" />
  </div>
  <div class="expression-operand">
    {#if isSquareMatrix}
      <NumberComponent bind:number={determinant} />
    {:else} 
      Incorrect matrix dimensions
    {/if}
  </div>
</div>
