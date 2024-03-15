<template>
  <article class="z-50 bg-slate-700 opacity-50">
    <header class="flex justify-between w-full">
      <p>Titulo del modal</p>
      <div>X</div>
    </header>
    <slot></slot>
    <footer>
      <button>Exit</button>
    </footer>
  </article>
</template>

<script>
  export default {
    name: 'Modal'
  }
</script>
