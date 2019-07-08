<script>
  import Generators from 'src/lib/generator'
  import MatrixComponent from 'src/components/Matrix'
  import NumberComponent from 'src/components/Number'
  import OperatorComponent from 'src/components/Operator'
  import Operators from 'src/lib/operators'

  let matrixA = Generators.incremental(3, 3)
  let multiplier = 5

  $: matrixB = Operators.multiply(matrixA, multiplier)
</script>


<h2>Multiply matrix on number </h2>

<div class="expression">
  <div class="expression-operand">
    <MatrixComponent bind:matrix={matrixA} editable />
  </div>
  <div class="expression-operator">
    <OperatorComponent operator="x" />
  </div>
  <div class="expression-operand">
    <NumberComponent bind:number={multiplier} editable />
  </div>

  <div class="expression-operator">
    <OperatorComponent operator="=" />
  </div>
  <div class="expression-operand">
    <MatrixComponent bind:matrix={matrixB} />
  </div>
</div>
