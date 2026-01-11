<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Drawer</h2>

    <div class="drawer-groups">
      <!-- Placements -->
      <div class="drawer-group">
        <div class="group-label q-text-caption q-c-dark-3">Placements</div>
        <div class="flow">
          <QButton class="outlined" @click="openDrawer('right')">Right</QButton>
          <QButton class="outlined" @click="openDrawer('left')">Left</QButton>
          <QButton class="outlined" @click="openDrawer('top')">Top</QButton>
          <QButton class="outlined" @click="openDrawer('bottom')">Bottom</QButton>
        </div>
      </div>

      <!-- Custom Size -->
      <div class="drawer-group">
        <div class="group-label q-text-caption q-c-dark-3">Custom Size</div>
        <div class="flow">
          <QButton class="outlined" @click="showLargeDrawer = true">Large Drawer (500px)</QButton>
        </div>
      </div>

      <!-- With Footer -->
      <div class="drawer-group">
        <div class="group-label q-text-caption q-c-dark-3">With Footer</div>
        <div class="flow">
          <QButton class="outlined" @click="showFooterDrawer = true">Drawer with Footer</QButton>
        </div>
      </div>
    </div>

    <!-- Basic Drawer -->
    <QDrawer v-model="showDrawer" :placement="placement" title="Drawer Title">
      <p>This is the drawer content.</p>
      <p>Placement: {{ placement }}</p>
    </QDrawer>

    <!-- Large Drawer -->
    <QDrawer v-model="showLargeDrawer" size="500px" title="Large Drawer">
      <p>This drawer has a custom width of 500px.</p>
      <p>You can put more content here.</p>
    </QDrawer>

    <!-- Drawer with Footer -->
    <QDrawer v-model="showFooterDrawer" title="Edit Profile">
      <div class="form-content">
        <QInput placeholder="Name" />
        <QInput placeholder="Email" />
        <QTextarea placeholder="Bio" :rows="4" />
      </div>
      <template #footer>
        <div class="drawer-footer-actions">
          <QButton class="outlined" @click="showFooterDrawer = false">Cancel</QButton>
          <QButton class="primary" @click="showFooterDrawer = false">Save</QButton>
        </div>
      </template>
    </QDrawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showDrawer = ref(false);
const placement = ref('right');
const showLargeDrawer = ref(false);
const showFooterDrawer = ref(false);

function openDrawer(p: string) {
  placement.value = p;
  showDrawer.value = true;
}
</script>

<style scoped lang="scss">
.drawer-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.drawer-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.drawer-footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
