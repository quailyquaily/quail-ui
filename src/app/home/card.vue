<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Card</h2>

    <div class="card-groups">
      <div class="card-group">
        <div class="group-label q-text-caption q-c-dark-3">Default</div>
        <div class="comparison-grid">
          <div class="comparison-panel">
            <div class="state-label q-text-caption">Static</div>
            <QCard
              eyebrow="Surface"
              title="Plain content card with stronger hierarchy."
              subtitle="Use this as the baseline information surface. In light and dark themes it stays close to the existing frame style."
            >
              <div class="q-text-body-text">
                Use it for summaries, settings blocks, and feature notes that need more structure than a bare frame.
              </div>
            </QCard>
          </div>

          <div class="comparison-panel">
            <div class="state-label q-text-caption">Hoverable</div>
            <QCard
              hoverable
              eyebrow="Surface"
              title="Plain content card with stronger hierarchy."
              subtitle="Use this as the baseline information surface. In light and dark themes it stays close to the existing frame style."
            >
              <div class="q-text-body-text">
                Use it for summaries, settings blocks, and feature notes that need more structure than a bare frame.
              </div>
            </QCard>
          </div>
        </div>
      </div>

      <div class="card-group">
        <div class="group-label q-text-caption q-c-dark-3">Dashed</div>
        <div class="comparison-grid">
          <div class="comparison-panel">
            <div class="state-label q-text-caption">Static</div>
            <QCard
              variant="dashed"
              eyebrow="Draft"
              title="Dashed surface for softer emphasis."
              subtitle="The same layout can move into a lighter state without becoming a separate component."
            >
              <div class="q-text-body-text">
                The dashed treatment works well for secondary notes, previews, and reference material.
              </div>
            </QCard>
          </div>

          <div class="comparison-panel">
            <div class="state-label q-text-caption">Hoverable</div>
            <QCard
              variant="dashed"
              hoverable
              eyebrow="Draft"
              title="Dashed surface for softer emphasis."
              subtitle="The same layout can move into a lighter state without becoming a separate component."
            >
              <div class="q-text-body-text">
                The dashed treatment works well for secondary notes, previews, and reference material.
              </div>
            </QCard>
          </div>
        </div>
      </div>

      <div class="card-group">
        <div class="group-label q-text-caption q-c-dark-3">Annotated</div>
        <div class="comparison-grid">
          <div class="comparison-panel">
            <div class="state-label q-text-caption">Chip</div>
            <QCard
              variant="annotated"
              marker="AN-14"
              marker-style="chip"
              eyebrow="Annotation"
              title="Marker and leader are morph-only enhancements."
              subtitle="They stay out of the way in light and dark, but can add diagrammatic rhythm inside the morph theme."
            >
              <div class="q-text-body-text">
                Use it for side commentary, process notes, or supporting context that needs a directional cue in Morph.
              </div>
            </QCard>
          </div>

          <div class="comparison-panel">
            <div class="state-label q-text-caption">Plate + Hoverable</div>
            <QCard
              variant="annotated"
              hoverable
              marker="AN-22 / REVIEW"
              marker-style="plate"
              eyebrow="Annotation"
              title="Annotated cards can switch marker shapes."
              subtitle="Use chip or plate markers for different annotation densities while keeping the same base card structure."
            >
              <div class="q-text-body-text">
                Use it for side commentary, process notes, or supporting context that needs a directional cue in Morph.
              </div>
            </QCard>
          </div>
        </div>
      </div>

      <div class="card-group">
        <div class="group-label q-text-caption q-c-dark-3">Tile</div>
        <div class="comparison-grid">
          <div class="comparison-panel">
            <div class="state-label q-text-caption">Static</div>
            <div class="tile-grid">
              <QCard
                v-for="item in tiles"
                :key="`static-${item.title}`"
                variant="tile"
                :marker="item.code"
                :title="item.title"
                :subtitle="item.subtitle"
              />
            </div>
          </div>

          <div class="comparison-panel">
            <div class="state-label q-text-caption">Hoverable</div>
            <div class="tile-grid">
              <QCard
                v-for="item in tiles"
                :key="`hoverable-${item.title}`"
                variant="tile"
                hoverable
                :marker="item.code"
                :title="item.title"
                :subtitle="item.subtitle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tiles = [
  { code: "01", title: "Inputs", subtitle: "Text and form entry" },
  { code: "02", title: "Feedback", subtitle: "Toasts and notices" },
];
</script>

<style scoped lang="scss">
.card-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.comparison-grid,
.tile-grid {
  display: grid;
  gap: 1rem;
}

.comparison-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.tile-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card-group .group-label,
.state-label {
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-group .group-label {
  margin-bottom: 0.5rem;
}

.comparison-panel {
  display: grid;
  gap: 0.625rem;
}

.state-label {
  color: var(--q-c-dark-3);
}

@media (max-width: 900px) {
  .comparison-grid,
  .tile-grid {
    grid-template-columns: 1fr;
  }
}
</style>
