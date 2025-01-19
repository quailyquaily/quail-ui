<template>
  <div class="section mb-4">
    <h2 class="q-text-h2 mb-4">Typeface</h2>
    <div class="rows grid gap-satoshi mb-4">
      <div class="row">
        <h1 class="q-text-display-title">Display Title: The quick brown fox jumps over the lazy dogs</h1>
      </div>
      <div class="row">
        <h2 class="q-text-display-desc">Display Desc: The quick brown fox jumps over the lazy dogs</h2>
      </div>
      <div class="row">
        <h1 class="q-text-display">Display: The quick brown fox jumps over the lazy dogs</h1>
      </div>
      <div class="row">
        <h1 class="q-text-h1">h1: The quick brown fox jumps over the lazy dogs</h1>
      </div>
      <div class="row">
        <h2 class="q-text-h2">h2: The quick brown fox jumps over the lazy dogs</h2>
      </div>
      <div class="row">
        <h3 class="q-text-h3">h3: The quick brown fox jumps over the lazy dogs</h3>
      </div>
      <div class="row">
        <h4 class="q-text-desc">desc: The quick brown fox jumps over the lazy dogs</h4>
      </div>
      <div class="row">
        <div class="q-text-body">body: The quick brown fox jumps over the lazy dogs</div>
      </div>
      <div class="row">
        <div class="q-text-caption">caption: The quick brown fox jumps over the lazy dogs</div>
      </div>
      <div class="row">
        <div class="q-text-code">code: The quick brown fox jumps over the lazy dogs</div>
      </div>
    </div>

    <div class="rows grid gap-satoshi mb-4">
      <div class="row">
        <div class="q-text-body q-c-dark">body: The quick brown fox jumps over the lazy dogs</div>
      </div>
      <div class="row">
        <div class="q-text-body q-c-dark-2">body: The quick brown fox jumps over the lazy dogs</div>
      </div>
      <div class="row">
        <div class="q-text-body q-c-dark-3">body: The quick brown fox jumps over the lazy dogs</div>
      </div>
      <div class="row">
        <div class="q-text-body q-c-dark-4">body: The quick brown fox jumps over the lazy dogs</div>
      </div>
    </div>

    <div class="rows dark grid gap-satoshi">
      <div class="row">
        <div class="q-text-body q-c-light">body: The quick brown fox jumps over the lazy dogs</div>
      </div>
      <div class="row">
        <div class="q-text-body q-c-light-2">body: The quick brown fox jumps over the lazy dogs</div>
      </div>
      <div class="row">
        <div class="q-text-body q-c-light-3">body: The quick brown fox jumps over the lazy dogs</div>
      </div>
      <div class="row">
        <div class="q-text-body q-c-light-4">body: The quick brown fox jumps over the lazy dogs</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rows {
  .row {
    padding: 0.5rem;
    background-color: var(--q-bg-white);
  }
  &.dark {
    .row {
      background-color: var(--q-bg-dark);
    }
  }
}
</style>