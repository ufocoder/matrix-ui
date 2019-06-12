<script>
  import Matrix from 'src/lib/matrix'
  import MatrixComponent from 'src/components/Matrix'
  import { isSquare, isZero, isIdentity } from 'src/lib/analyzer'

  let data = [[1]]
  let matrix = new Matrix(data)

  console.log(isIdentity(matrix))
  console.log(isSquare(matrix))
  console.log(matrix.getData(), matrix.width, matrix.height)
</script>

<h2>Matrix</h2>

<MatrixComponent data={data} editable />

<h3>Details</h3>
<div>
  {#if isSquare(matrix)}
    Квадратная
  {/if}
  {#if isZero(matrix)}
    Нулевая
  {/if}
  {#if isIdentity(matrix)}
    Единичная
  {/if}
</div>
