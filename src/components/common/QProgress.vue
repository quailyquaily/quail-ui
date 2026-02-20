<template>
  <div class="q-progress" :class="color">
    <div class="q-progress-slot">
      <div class="q-progress-bar" :style="{ width: barWidth }" :class="completed? '': 'animated' ">
        <div class="q-progress-bar-inner"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  infinite: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "blue",
  },
  max: {
    type: Number,
    default: 100,
  },
  value: {
    type: Number,
    default: 0,
  },
});

const barWidth = computed(() => {
  if (props.infinite) {
    return "100%";
  }
  return `${(props.value / props.max) * 100}%`;
});

const completed = computed(() => {
  return props.value >= props.max;
});

</script>
<style lang="scss">
.q-progress {
  display: block;
  min-width: 200px;
  --q-progress-fill: repeating-linear-gradient(
    45deg,
    #0d75fc,
    #0d75fc 10px,
    #61a5ff 10px,
    #61a5ff 20px
  );
  &.green {
    --q-progress-fill: repeating-linear-gradient(
      45deg,
      #10b981,
      #10b981 10px,
      #6ee7b7 10px,
      #6ee7b7 20px
    );
  }
  &.red {
    --q-progress-fill: repeating-linear-gradient(
      45deg,
      #ae1300,
      #ae1300 10px,
      #e66372 10px,
      #e66372 20px
    );
  }
  &.orange {
    --q-progress-fill: repeating-linear-gradient(
      45deg,
      #d97706,
      #d97706 10px,
      #fbbf24 10px,
      #fbbf24 20px
    );
  }
  .q-progress-slot {
    position: relative;
    width: 100%;
    height: var(--q-progress-track-height);
    background: var(--q-progress-track-bg);
    border-radius: var(--q-progress-track-radius);
    overflow: hidden;
    .q-progress-bar {
      border-radius: var(--q-progress-bar-radius);
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transition: width 0.2s ease-in-out;
      overflow: hidden;
      &.animated {
        .q-progress-bar-inner {
          animation: progress 1s linear infinite;
        }
      }
    }
    .q-progress-bar-inner {
      background: var(--q-progress-fill);
      position: absolute;
      left: -28px;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
}
@keyframes progress {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(28px);
	}
}
</style>
