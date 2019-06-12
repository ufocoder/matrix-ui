<script>
  import Router, { link } from 'svelte-spa-router'
  import Home from './routes/Home.svelte'
  import Details from './routes/Details.svelte'
  import Multiply from './routes/Multiply.svelte'
  import NotFound from './routes/NotFound.svelte'

  const routes = {
    '/': Home,
    '/details': Details,
    '/multiply': Multiply,
    '*': NotFound,
  }
</script>

<style>
  .menu {
    display: block;
  }
  .menu-link {
    display: block;
  }
</style>

<nav class="menu">
  <a class="menu-link" use:link href="/">Home</a>
  <a class="menu-link" use:link href="/details">Matrix: details</a>
  <a class="menu-link" use:link href="/multiply">Matrix: multiply</a>
</nav>

<Router {routes}/>
