<template>
  <div class="section typeface-section">
    <div class="type-layout">
      <div class="type-column">
        <div class="sample display">
          <div class="sample-label q-text-caption q-c-dark-3">Display</div>
          <div class="q-text-display-title">Writing tools with a steadier voice.</div>
        </div>

        <div class="sample">
          <div class="sample-label q-text-caption q-c-dark-3">Headings</div>
          <div class="sample-stack">
            <h1 class="q-text-h1">Editorial hierarchy should feel immediate.</h1>
            <h2 class="q-text-h2">Subheads carry tone without shouting.</h2>
            <h3 class="q-text-h3">Utility labels stay compact and calm.</h3>
          </div>
        </div>
      </div>

      <div class="type-column">
        <div class="sample">
          <div class="sample-label q-text-caption q-c-dark-3">Body copy</div>
          <div class="sample-stack">
            <p class="q-text-body">
              Quail UI works best when the surface feels published, not templated.
            </p>
            <p class="q-text-body-desc">
              Supporting copy should explain intent, not repeat the label above it.
            </p>
            <p class="q-text-body-text">
              Body text handles the everyday rhythm of settings, forms, and article furniture.
            </p>
            <p class="q-text-caption">
              Captions stay light, useful, and quiet.
            </p>
          </div>
        </div>

        <div class="sample tone-sample">
          <div class="sample-label q-text-caption q-c-dark-3">Color steps</div>
          <div class="tone-list">
            <span class="q-text-body-text q-c-dark">Primary dark for final emphasis.</span>
            <span class="q-text-body-text q-c-dark-2">Secondary dark for supporting context.</span>
            <span class="q-text-body-text q-c-dark-3">Tertiary dark for labels and hints.</span>
            <span class="q-text-body-text q-c-dark-4">Quietest dark for separators and scaffolding.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.typeface-section {
  margin: 0;
}

.type-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
}

.type-column {
  display: grid;
  gap: 1rem;
}

.sample {
  display: grid;
  gap: 0.625rem;
  padding: 1rem;
  border: 0.5px solid var(--q-c-dark-4);
  border-radius: 8px;
  background: color-mix(in srgb, var(--q-bg-light) 82%, white 18%);
}

.sample.display {
  min-height: 100%;
}

.sample-label {
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.sample-stack {
  display: grid;
  gap: 0.625rem;
}

.tone-list {
  display: grid;
  gap: 0.5rem;
}

:global(.dark) .sample {
  border-color: var(--q-c-light-4);
  background: color-mix(in srgb, var(--q-bg-dark) 80%, black 20%);
}
</style>
