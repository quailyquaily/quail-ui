<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Media Frame</h2>

    <div class="media-groups">
      <div class="media-group">
        <div class="group-label q-text-caption q-c-dark-3">Image Frame</div>
        <QMediaFrame
          src="https://static.quaily.com/media/jo4uz87q.jpg"
          top-label="FRAME 01"
          bottom-label="12 / 05"
          caption="Use for hero media, article figures, or feature imagery that needs a stronger shell than a bare image."
        />
      </div>

      <div class="media-group">
        <div class="group-label q-text-caption q-c-dark-3">CRT Overlay</div>
        <QMediaFrame
          crt
          top-label="SCAN"
          bottom-label="CRT"
          caption="The CRT effect stays optional and works best for Morph-specific moments."
        >
          <div class="signal-panel">
            <div class="signal-copy">
              <span class="signal-kicker">Signal View</span>
              <strong>Frame diagnostics online.</strong>
            </div>
          </div>
        </QMediaFrame>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.media-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.media-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.signal-panel {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.34), transparent 34%),
    linear-gradient(135deg, rgba(66, 111, 158, 0.18), rgba(33, 68, 107, 0.72));
  color: white;
}

.signal-copy {
  display: grid;
  gap: 0.45rem;
  text-align: center;
}

.signal-kicker {
  font-family: var(--q-font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.82;
}
</style>
