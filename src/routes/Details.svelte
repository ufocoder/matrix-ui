<script>
  import Matrix from 'src/lib/matrix'
  import MatrixComponent from 'src/components/Matrix'
  import { classifiers } from 'src/lib/analyzer'

  let data = [[1]]
  let matrix = new Matrix(data)
</script>

<h2>Matrix</h2>

<MatrixComponent data={data} editable />

<h3>Details</h3>
<div>
  {#each classifiers as classifier}
    {#if classifier.analyzer(matrix)}
      <span class="chip">{classifier.key}</span>
    {/if}
  {/each}
</div>
