<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Tooltip</h2>

    <div class="tooltip-groups">
      <!-- Positions -->
      <div class="tooltip-group">
        <div class="group-label q-text-caption q-c-dark-3">Positions</div>
        <div class="flow">
          <QTooltip content="Tooltip on top" position="top">
            <QButton class="outlined">Top</QButton>
          </QTooltip>
          <QTooltip content="Tooltip on bottom" position="bottom">
            <QButton class="outlined">Bottom</QButton>
          </QTooltip>
          <QTooltip content="Tooltip on left" position="left">
            <QButton class="outlined">Left</QButton>
          </QTooltip>
          <QTooltip content="Tooltip on right" position="right">
            <QButton class="outlined">Right</QButton>
          </QTooltip>
        </div>
      </div>

      <!-- Triggers -->
      <div class="tooltip-group">
        <div class="group-label q-text-caption q-c-dark-3">Triggers</div>
        <div class="flow">
          <QTooltip content="Hover to show" trigger="hover">
            <QButton class="outlined">Hover</QButton>
          </QTooltip>
          <QTooltip content="Click to show" trigger="click">
            <QButton class="outlined">Click</QButton>
          </QTooltip>
          <QTooltip content="Focus to show" trigger="focus">
            <QInput placeholder="Focus me" style="width: 120px;" />
          </QTooltip>
        </div>
      </div>

      <!-- No Arrow -->
      <div class="tooltip-group">
        <div class="group-label q-text-caption q-c-dark-3">Without Arrow</div>
        <div class="flow">
          <QTooltip content="No arrow tooltip" :arrow="false">
            <QButton class="outlined">No Arrow</QButton>
          </QTooltip>
        </div>
      </div>

      <!-- Custom Content -->
      <div class="tooltip-group">
        <div class="group-label q-text-caption q-c-dark-3">Custom Content</div>
        <div class="flow">
          <QTooltip>
            <template #content>
              <div class="custom-tooltip">
                <strong>Rich Content</strong>
                <p>Supports HTML content</p>
              </div>
            </template>
            <QButton class="outlined">Custom</QButton>
          </QTooltip>
        </div>
      </div>

      <!-- Disabled -->
      <div class="tooltip-group">
        <div class="group-label q-text-caption q-c-dark-3">Disabled</div>
        <div class="flow">
          <QTooltip content="This won't show" disabled>
            <QButton class="outlined">Disabled Tooltip</QButton>
          </QTooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.tooltip-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.tooltip-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.custom-tooltip {
  p {
    margin: 4px 0 0 0;
    font-size: 0.75rem;
    opacity: 0.8;
  }
}
</style>
