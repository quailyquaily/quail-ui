<template>
  <div class="section mb-4">
    <div class="divider mb-4"></div>
    <h2 class="q-text-h2 mb-4">Toast</h2>

    <div class="toast-groups">
      <!-- Types -->
      <div class="toast-group">
        <div class="group-label q-text-caption q-c-dark-3">Types</div>
        <div class="flow">
          <QButton class="outlined" @click="showSuccess">Success</QButton>
          <QButton class="outlined" @click="showError">Error</QButton>
          <QButton class="outlined" @click="showWarning">Warning</QButton>
          <QButton class="outlined" @click="showInfo">Info</QButton>
        </div>
      </div>

      <!-- With Options -->
      <div class="toast-group">
        <div class="group-label q-text-caption q-c-dark-3">With Options</div>
        <div class="flow">
          <QButton class="outlined" @click="showClosable">Closable</QButton>
          <QButton class="outlined" @click="showLongDuration">Long Duration (5s)</QButton>
          <QButton class="outlined" @click="showPersistent">Persistent (no auto close)</QButton>
        </div>
      </div>

      <!-- Close All -->
      <div class="toast-group">
        <div class="group-label q-text-caption q-c-dark-3">Actions</div>
        <div class="flow">
          <QButton class="outlined" @click="showMultiple">Show Multiple</QButton>
          <QButton class="danger" @click="closeAll">Close All</QButton>
        </div>
      </div>

      <!-- Declarative Usage -->
      <div class="toast-group">
        <div class="group-label q-text-caption q-c-dark-3">Declarative (v-model)</div>
        <div class="flow">
          <QButton class="outlined" @click="declarativeVisible = true">Show Toast</QButton>
        </div>
        <QToast
          v-model="declarativeVisible"
          type="success"
          message="This is a declarative toast!"
          closable
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from '@/composables/useToast';

const toast = useToast();
const declarativeVisible = ref(false);

function showSuccess() {
  toast.success('Operation completed successfully!');
}

function showError() {
  toast.error('Something went wrong!');
}

function showWarning() {
  toast.warning('Please check your input');
}

function showInfo() {
  toast.info('Here is some information');
}

function showClosable() {
  toast.show({
    type: 'info',
    message: 'Click X to close',
    closable: true,
  });
}

function showLongDuration() {
  toast.show({
    type: 'info',
    message: 'This will stay for 5 seconds',
    duration: 5000,
  });
}

function showPersistent() {
  toast.show({
    type: 'warning',
    message: 'This will not auto close',
    duration: 0,
    closable: true,
  });
}

function showMultiple() {
  toast.success('First message');
  setTimeout(() => toast.info('Second message'), 300);
  setTimeout(() => toast.warning('Third message'), 600);
}

function closeAll() {
  toast.closeAll();
}
</script>

<style scoped lang="scss">
.toast-groups {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.toast-group {
  .group-label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}
</style>
