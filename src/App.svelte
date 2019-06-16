<script>
  import Router, { link } from 'svelte-spa-router'
  import Home from './routes/Home.svelte'
  import Details from './routes/Details.svelte'
  import AddMatrix from './routes/AddMatrix.svelte'
  import MultiplyMatrix from './routes/MultiplyMatrix.svelte'
  import MultiplyNumber from './routes/MultiplyNumber.svelte'
  import NotFound from './routes/NotFound.svelte'

  const routes = {
    '/': Home,
    '/matrix/details': Details,
    '/matrix/add/matrix': AddMatrix,
    '/matrix/multiply/matrix': MultiplyMatrix,
    '/matrix/multiply/number': MultiplyNumber,
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
.accordion-header {
  color: #455060;
  font-size: .65rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: .2rem 0;
}
.route {
  padding: 4rem;
}
</style>

<div class="docs-container">
  <div class="docs-sidebar">
    <div class="docs-brand">
      <a href="/" class="navbar-brand">Math UI</a>
    </div>
    <div class="docs-nav">
      <div class="accordion-container">
        <div class="accordion">
          <input id="accordion-matrix" type="checkbox" name="docs-accordion-checkbox" hidden checked="checked">
          <label class="accordion-header c-hand" for="accordion-matrix">Matrix</label>
          <div class="accordion-body">
            <ul class="menu menu-nav">
              <li class="menu-item">
                <a use:link href="/matrix/details">Details</a>
              </li>
              <li class="menu-item">
                <a use:link href="/matrix/add/matrix">Add two matrix</a>
              </li>
              <li class="menu-item">
                <a use:link href="/matrix/multiply/number">Multiply on number</a>
              </li>
              <li class="menu-item">
                <a use:link href="/matrix/multiply/matrix">Multiply on matrix</a>
              </li>
          </div>
        </div>        
      </div>
    </div>
  </div>
  <div class="docs-content">
    <div class="route">
      <Router {routes} />
    </div>
  </div>
</div>
