<script>
  import Matrix from 'src/lib/matrix'
  import MatrixComponent from 'src/components/Matrix'
  import NumberComponent from 'src/components/Number'
  import OperatorComponent from 'src/components/Operator'

  let data = [[1]]
  let number = 5
  let result

  $: {
    result = Matrix.from(data).multiply(number).getData()
  }

  const onMatrixChange = e => data = e.detail.data
  const onNumberChange = e => number = e.detail.number
</script>

<style>
.expression {
  display: flex;
  align-items: center;
}
.expression-operator {
  margin: 0 20px;
}
.expression-operand {
  
}
</style>

<h2>Multiply matrix on number </h2>

<div class="expression">
  <div class="expression-operand">
    <MatrixComponent data={data} on:change={onMatrixChange} editable />
  </div>
  <div class="expression-operator">
    <OperatorComponent operator="x" />
  </div>
  <div class="expression-operand">
    <NumberComponent number={number} on:change={onNumberChange} editable />
  </div>

  <div class="expression-operator">
    <OperatorComponent operator="=" />
  </div>
  <div class="expression-operand">
    <MatrixComponent bind:data={result} />
  </div>
</div>
