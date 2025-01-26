<script setup lang="ts">
import { computed, ref, watch } from "vue";
import QIconArrowLeft from '../icons/QIconArrowLeft.vue';
import QIconArrowRight from '../icons/QIconArrowRight.vue';
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  totalPage: {
    type: Number,
    default: 0,
  },
  hasPrev: {
    type: Boolean,
    default: false,
  },
  hasNext: {
    type: Boolean,
    default: false,
  }
});

const indicators = computed(() => {
  let max = 6;
  const result:any = [];
  if (props.totalPage !== 0) {
    if (props.totalPage <= max) {
      for (let i = 1; i <= props.totalPage; i++) {
        result.push({ label: i });
      }
    } else {
      result.push({ label: 1});
      // check the range around the current page
      let start = val.value - 2;
      let end = val.value + 2;
      if (start < 2) {
        start = 2;
        end = start + max - 2;
      }
      if (end > props.totalPage - 1) {
        end = props.totalPage - 1;
        start = end - max + 2;
      }
      if (start > 2) {
        result.push({ label: "…", disabled: true });
      }
      for (let i = start; i <= end; i++) {
        result.push({ label: i });
      }
      if (end < props.totalPage - 1) {
        result.push({ label: "…", disabled: true });
      }
      result.push({ label: props.totalPage });
    }
  } else {

  }
  return result;
});

const val = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
	val.value = value;
});

const emit = defineEmits(["change:next", "change:prev", "change:goto", "update:modelValue"]);

function prevPage() {
  val.value--;
  emit("change:prev", val.value);
  emit("update:modelValue", val.value);
}

function nextPage() {
  val.value++;
  emit("change:next", val.value);
  emit("update:modelValue", val.value);
}

function gotoPage(ix: any, item:any ) {
  if (item.disabled) {
    return;
  }
  val.value = ix;
  emit("change:goto", val.value);
  emit("update:modelValue", val.value);
}

</script>
<template>
  <div class="q-pagination">
    <q-button class="prev sm outlined icon" @click="prevPage" :disabled="!props.hasPrev">
      <q-icon-arrow-left class="icon" ></q-icon-arrow-left>
    </q-button>
    <div v-if="totalPage !== 0" class="q-page-indicators">
      <div v-for="item in indicators" class="q-page-indicator">
        <q-button class="q-page-indicator sm outlined" :class="item.label === val? 'active': ''" :disabled="item.disabled" @click="gotoPage(item.label, item)">
          {{ item.label }}
        </q-button>
      </div>
    </div>
    <q-button v-else class="outlined sm q-page-indicator-simple q-page-indicator">
      <div class="">{{ modelValue }}</div>
    </q-button>
    <q-button class="next sm outlined icon" @click="nextPage" :disabled="!props.hasNext">
      <q-icon-arrow-right class="icon" ></q-icon-arrow-right>
    </q-button>
  </div>
</template>

<style lang="scss">
.q-pagination {
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .prev, .next {
    box-shadow: none !important;
  }
  .prev {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
  .next {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
  .q-page-indicators {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  .q-page-indicator {
    border-radius: 0 !important;
    background-color: var(--q-bg-light) !important;
    border-right: none !important;
    &:first-child {
      .q-button {
        border-left: none !important;
      }
    }
    .q-button {
      padding-left: 0.6rem;
      padding-right: 0.6rem;
      border-right: none !important;
      border-left: none !important;
      box-shadow: none !important;
    }
    .q-button[disabled] {
      padding-left: 0.3rem;
      padding-right: 0.3rem;
    }
    .q-button.active {
      color: var(--q-c-red);
      opacity: 1;
      &:hover {
        color: var(--q-c-red-light);
      }
    }
  }
  .q-page-indicator-simple {
    padding: 0 1rem;
    font-size: 0.9rem;
    border-left: none !important;
    border-right: none !important;
    color: var(--q-c-red) !important;
  }
}
.dark {
  .q-pagination {
    .q-page-indicator {
      background-color: var(--q-c-black) !important;
      .q-button.active {
        color: var(--q-c-red-light);
        opacity: 1;
        &:hover {
          color: var(--q-c-red-lighter);
        }
      }
    }
    .q-page-indicator-simple {
      padding: 0 1rem;
      font-size: 0.9rem;
      border-left: none !important;
      border-right: none !important;
      color: var(--q-c-red-light) !important;
    }
  }
}
</style>