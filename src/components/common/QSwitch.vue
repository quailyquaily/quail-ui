<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
	disabled: {
		type: Boolean,
		default: false,
	},
	theme: {
		type: String, // default, clear-sky, plastic
		default: 'default',
	},
});

const val = ref(props.modelValue);

watch(() => props.modelValue, (value) => {
	val.value = value;
});

const emit = defineEmits(['update:modelValue', 'change']);

const cls = computed(() => {
	const ret = [];
	if (props.theme) {
		ret.push(`theme-${props.theme}`);
	}
	if (props.disabled) {
		ret.push('disabled');
	}
	return ret.join(' ');
});

function change(event:any) {
  emit('update:modelValue', val.value);
  emit('change', val.value);
}

</script>

<template>
<label class="q-switch" :class="cls">
	<input class="q-switch-checkbox" type="checkbox" v-model="val" @change="change" :disabled="props.disabled">
	<div class="q-switch-inner">
		<div class="q-switch-handle">
			<template v-if="props.theme === 'plastic'">
				<q-icon-sun v-if="val" class="q-switch-icon" />
				<q-icon-moon-star v-else class="q-switch-icon" />
			</template>
		</div>
	</div>
</label>
</template>

<style lang="scss">
.q-switch {
  --switch-w: 52px;
  --switch-h: 32px;
	cursor: pointer;
	display: inline-block;
	&.disabled {
		opacity: 0.5;
	}

	.q-switch-inner {
		display: inline-block;
		background: var(--q-c-dark-4);
		border-radius: 16px;
		width: var(--switch-w);
		height: var(--switch-h);
		position: relative;
		vertical-align: middle;
		transition: all 0.25s;
		cursor: default;
		.q-switch-handle,
		&:after {
			content: "";
		}
		.q-switch-handle {
			display: block;
			background: linear-gradient(to bottom, #fff 0%,#eee 100%);
			border-radius: 50%;
			box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
			width: 24px;
			height: 24px;
			position: absolute;
			top: 4px;
			left: 4px;
			transition: left 0.25s;
		}
		.q-switch:hover &.q-switch-handle {
			background: linear-gradient(to bottom, #fff 0%,#fff 100%);
			box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
		}
	}
	.q-switch-checkbox:checked  {
		& + .q-switch-inner {
			background: rgb(55, 162, 255);
			.q-switch-handle {
				left: 24px;
			}
		}
	}
}
.q-switch.theme-plastic {
	.q-switch-inner {
		background: #161616;
		.q-switch-handle {
			background: linear-gradient(to bottom, #484833 0%,#333 100%);
			.q-switch-icon {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 16px;
				height: 16px;
				color: #fff079;
			}
		}
	}
	.q-switch-checkbox:checked {
		& + .q-switch-inner {
			background: #e4e6e8;
			.q-switch-handle {
				background: linear-gradient(to bottom, #fff 0%,#eee 100%);
				.q-switch-icon {
					color: rgb(55, 162, 255);
				}
			}
		}
	}
}
.q-switch.theme-clear-sky {
	--toggle-size: 2rem;
  --switch-handle-scale: .7;
  --switch-off-handle-x: -6px;
  --switch-on-handle-x: -6px;
  --switch-transition-duration: .2s;

	.q-switch-inner {
		font-size: var(--toggle-size);
    display: flex;
    height: var(--switch-h);
    width: var(--switch-w);
    border-radius: calc(var(--switch-h) / 2);
    background-size: auto 8em;
      background-position: bottom;
    background-image: linear-gradient(180deg, #62E7F7 0%, #4184B1 33%, #20206A 81%, #021037 100%);
        transition: var(--switch-transition-duration);
    border: 2px solid  hsl(207, 30%, 50%);
    overflow: hidden;

		.q-switch-handle {
			background: transparent;
      border-radius: 50%;
      height: var(--switch-h);
      width: var(--switch-h);
      transform: translateX(var(--switch-off-handle-x)) translateY(0px) scale(var(--switch-handle-scale));
      transition: var(--switch-transition-duration);
      cursor: pointer;
      margin-top: var(--switch-off-handle-x);
			box-shadow: inset 0.1em -0.1em 0 0 #fbe7ef, inset 0.28em -0.28em 0 0 #fffff7;
		}
	}
	.q-switch-checkbox:checked {
    font-size: var(--switch-font-size);

    & + .q-switch-inner {
      background-position: top;
      border-color: hsl(204, 7%, 86%);

			.q-switch-handle {
				background: #fffad8;
        transform: translateX(var(--switch-on-handle-x)) translateY(0px) scale(var(--switch-handle-scale));
				box-shadow: 0 0 .25em .0625em #fbee8d, 0 0 2em 0 #FFEB3B, inset -.25em -.25em 0 0 #fbee8e, inset -.3125em -.3125em 0 .625em #fff5b2;
      }
    }
  }

}
.q-switch-checkbox {
	position: absolute;
	visibility: hidden;
}
</style>
