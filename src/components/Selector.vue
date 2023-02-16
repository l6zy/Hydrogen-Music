<template>
  <div class="selector" ref="select" @click="changeOptionsVisible">
    <div class="selector-head">
      <span class="select-head-cont">{{ current.label }}</span>
    </div>
    <teleport to="body">
      <transition name="selector" @enter="absolutePosition(overlay, select)">
        <div
          class="selector-option"
          :style="{
            '--count': options.length < maxItems ? options.length : maxItems,
            maxHeight: maxItems * 34 + 16 + 'px',
          }"
          v-if="option"
          ref="overlay"
        >
          <div
            class="selector-option-item"
            v-for="item in options"
            @click="changeOption(item)"
            :class="{
              'selector-option-item-selected': modelValue === item.value,
            }"
          >
            {{ item.label }}
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
import { computed, onActivated, onDeactivated, ref } from "vue";

const props = defineProps({
  options: Array,
  modelValue: null,
  maxItems: {
    type: Number,
    default: 4,
  },
});
const emit = defineEmits(["update:modelValue"]);

const select = ref();
const overlay = ref();
const option = ref(false);
const current = computed(() =>
  props.options.find((x) => x.value === props.modelValue)
);

const changeOption = (e) => {
  emit("update:modelValue", e.value);
  option.value = false;
};

let clickOutside = (event) => {
  if (select.value && !select.value.contains(event.target)) {
    option.value = false;
  }
};
onActivated(() => {
  window.addEventListener("click", clickOutside);
});
onDeactivated(() => {
  window.removeEventListener("click", clickOutside);
});

const absolutePosition = (element, target) => {
  if (element) {
    let elementDimensions = {
      width: element.offsetWidth,
      height: props.options.length * 34 + 16,
    };
    let elementOuterHeight = elementDimensions.height;
    let elementOuterWidth = elementDimensions.width;
    let targetOuterHeight = target.offsetHeight;
    let targetOuterWidth = target.offsetWidth;
    let targetOffset = target.getBoundingClientRect();
    let windowScrollTop = getWindowScrollTop();
    let windowScrollLeft = getWindowScrollLeft();
    let viewport = getViewport();
    let top, left;

    if (
      targetOffset.top + targetOuterHeight + elementOuterHeight >
      viewport.height
    ) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight;
      element.style.transformOrigin = "bottom";

      if (top < 0) {
        top = windowScrollTop;
      }
    } else {
      top = targetOuterHeight + targetOffset.top + windowScrollTop + 1;
      element.style.transformOrigin = "top";
    }

    if (targetOffset.left + elementOuterWidth > viewport.width)
      left = Math.max(
        0,
        targetOffset.left +
          windowScrollLeft +
          targetOuterWidth -
          elementOuterWidth
      );
    else left = targetOffset.left + windowScrollLeft;

    element.style.top = top + "px";
    element.style.left = left + "px";
  }
};
const getWindowScrollTop = () => {
  let doc = document.documentElement;

  return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
};
const getWindowScrollLeft = () => {
  let doc = document.documentElement;

  return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
};
const getViewport = () => {
  let win = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    w = win.innerWidth || e.clientWidth || g.clientWidth,
    h = win.innerHeight || e.clientHeight || g.clientHeight;

  return { width: w, height: h };
};
const changeOptionsVisible = () => (option.value = !option.value);
</script>

<style scoped lang="scss">
.selector {
  position: relative;
  &-head {
    text-align: center;
    box-sizing: border-box;
  }
}

.selector-option {
  position: absolute;
  overflow-y: overlay;
  background: rgb(228, 240, 240);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  line-height: 25px;
  user-select: none;
  padding: 8px 0;
}

.selector-option-item {
  width: 200px;
  height: 34px;
  font: 13px SourceHanSansCN-Bold;
  background-image: linear-gradient(90deg, black, black);
  background-repeat: repeat-y;
  background-position: -200px 0;
  padding: 0 16px;
  line-height: 34px;
  transition: background-position 0.2s, color 0.2s;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-position: 0 0;
    color: white;
  }
  &-selected {
    background-color: black;
    color: white;
  }
}

::-webkit-scrollbar-track {
  border-radius: 0;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 0;
  background: rgba(0, 0, 0, 0.15);
  transition: color 0.2s ease;
}
</style>
<style lang="scss">
.selector-enter-active,
.selector-leave-active {
  transition: all 0.225s;
  overflow: hidden;
  box-sizing: content-box;
}
.selector-enter-from,
.selector-leave-to {
  height: 0;
  &.selector-option {
    padding: 0;
  }
}
.selector-enter-to,
.selector-leave-from {
  height: calc(var(--count) * 34px);
  &.selector-option {
    padding: 8px 0;
  }
}
</style>
