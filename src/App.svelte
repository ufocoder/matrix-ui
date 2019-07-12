<script>
  import Router, { link, push } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'
  import Home from './routes/Home.svelte'
  import Help from './routes/Help.svelte'
  import Details from './routes/Details.svelte'
  import AddMatrix from './routes/AddMatrix.svelte'
  import MultiplyMatrix from './routes/MultiplyMatrix.svelte'
  import MultiplyNumber from './routes/MultiplyNumber.svelte'
  import NotFound from './routes/NotFound.svelte'

  const routes = {
    '/matrix/details': Details,
    '/matrix/add/matrix': AddMatrix,
    '/matrix/multiply/matrix': MultiplyMatrix,
    '/matrix/multiply/number': MultiplyNumber,
    '/help': Help,
    '/': Home,
    '*': NotFound,
  }
</script>

<style>
.docs-container {
  min-height: 100vh;
  display: flex;
  flex-flow: nowrap;
  height: 100%;
  position: relative;
  width: 100%;
}
.docs-brand {
  color: #5755d9;
  height: 2rem;
  left: 1.5rem;
  font-size: 1.2rem;
  position: fixed;
  top: .85rem;
}
.docs-nav {
  bottom: 1.5rem;
  overflow-y: auto;
  padding: .5rem 1.5rem;
  position: fixed;
  top: 3.5rem;
  width: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.docs-sidebar {
  flex: 0 0 auto;
  position: relative;
  transform: none;
  width: 12rem;
  background: #f7f8f9;
}
.docs-content {
  flex: 1 1 auto;
  height: 100%;
  background: #fff;
}
.route {
  padding: 4rem;
}
</style>

<div class="docs-container">
  <div class="docs-sidebar">
    <div class="docs-brand">
      <a href="/" class="navbar-brand">
        Matrix UI
      </a>
    </div>
    <div class="docs-nav">
      <ul class="nav">
        <li class="nav-item" use:active={'/matrix/details'}>
          <a use:link href="/matrix/details">
            Single matrix details
          </a>
        </li>
        <li class="nav-item" use:active={'/matrix/add/matrix'}>
          <a use:link href="/matrix/add/matrix">
            Add two matrix
          </a>
        </li>
        <li class="nav-item" use:active={'/matrix/multiply/number'}>
          <a use:link href="/matrix/multiply/number">
            Multiply on number
          </a>
        </li>
        <li class="nav-item" use:active={'/matrix/multiply/matrix'}>
          <a use:link href="/matrix/multiply/matrix">
            Multiply on matrix
          </a>
        </li>
      </ul>
      <ul class="nav">
        <li class="nav-item" use:active={'/help'}>
          <a use:link href="/help">
            Help
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="docs-content">
    <div class="route">
      <Router {routes} />
    </div>
  </div>
</div>
