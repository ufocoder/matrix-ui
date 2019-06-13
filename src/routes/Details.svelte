<script>
  import Matrix from 'src/lib/matrix'
  import MatrixComponent from 'src/components/Matrix'
  import { analyzers } from 'src/lib/analyzer'

  let data = [[1,2,3], [4,5,6], [7,8,9]]
  let matrix = new Matrix(data)
  let classifiers = analyzers.filter(({ analyzer }) => analyzer(matrix)).map(({ key }) => key)

  console.log(classifiers)

  $: {
    classifiers = analyzers.filter(({ analyzer }) => analyzer(matrix)).map(({ key }) => key)
    console.log(classifiers)
  }
</script>

<h2>Matrix</h2>

<MatrixComponent data={data} editable />

<h3>Details</h3>
<div>
  {#each classifiers as classifier}
    <span class="chip">{classifier}</span>
  {/each}
</div>
