<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  accept: {
    type: String,
    default: "datetime", // date, time, datetime
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const date = ref("");
const time = ref("");

watch(
  () => props.modelValue,
  (value) => {
    const ret = getFormattedDatetime(value);
    date.value = ret.date;
    time.value = ret.time;
  }
);

const showDate = computed(() => props.accept === "date" || props.accept === "datetime");
const showTime = computed(() => props.accept === "time" || props.accept === "datetime");

function getFormattedDatetime(value:string) {
  let dd = null;
  if (value) {
    dd = new Date(value);
  } else {
    dd = new Date();
  }
  // check if date is valid
  if (isNaN(dd.getTime())) {
    dd = new Date();
  }
  // format date: yyyy-mm-dd
  const year = dd.getFullYear();
  const month = String(dd.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(dd.getDate()).padStart(2, '0');
  // format time: hh:mm
  const hours = String(dd.getHours()).padStart(2, '0');
  const minutes = String(dd.getMinutes()).padStart(2, '0');

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}`,
  }
}

function changed() {
  const ret = getFormattedDatetime(`${date.value} ${time.value}`);
  const t = `${ret.date}T${ret.time}:00`;
  emit("change", t);
  emit("update:modelValue", t);
}

onMounted(() => {
  const ret = getFormattedDatetime('');
  date.value = ret.date;
  time.value = ret.time;
  if (props.modelValue) {
    const ret = getFormattedDatetime(props.modelValue);
    date.value = ret.date;
    time.value = ret.time;
  }
});
</script>

<template>
  <div class="q-datetime-picker touchable outlined">
    <input v-if="showDate" v-model="date" type="date" :disabled="disabled" @change="changed" />
    <input v-if="showTime" v-model="time" type="time" :disabled="disabled" @change="changed" />
  </div>
</template>

<style lang="scss">
.q-datetime-picker {
  border: 0.5px solid var(--q-c-dark-4);
  border-radius: 6px;
}
.q-datetime-picker {
  input[type="date"],
  input[type="time"] {
    height: 2.5rem;
    padding: 0.5rem;
    border: none;
    outline: none;
    background: transparent;
    color: var(--q-c-black);
    &:focus {
      color: var(--q-c-black);
      border: none !important;
      outline: none !important;
    }
  }
}
.dark {
  .q-datetime-picker {
    border: 0.5px solid var(--q-c-light-4);
    input[type="date"],
    input[type="time"] {
      color: var(--q-c-white);
    }
  }
}
</style>
