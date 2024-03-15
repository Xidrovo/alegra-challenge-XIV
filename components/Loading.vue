<template>
  <div :class="['lds-ring opacity-75', getLoadingSize, extraClass]">
    <div
      :style="{ borderColor: `${borderColorData}` }"
      :class="getLoadingSize"
    ></div>
    <div
      :style="{ borderColor: `${borderColorData}` }"
      :class="getLoadingSize"
    ></div>
    <div
      :style="{ borderColor: `${borderColorData}` }"
      :class="getLoadingSize"
    ></div>
    <div
      :style="{ borderColor: `${borderColorData}` }"
      :class="getLoadingSize"
    ></div>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    data() {
      return {
        borderColorData: `${this.color} transparent transparent transparent`,
        loadingScale: 'scale-50'
      }
    },
    props: {
      color: {
        type: String,
        default: '#fff'
      },
      size: {
        type: String,
        validator: function (value) {
          return ['small', 'medium', 'large'].includes(value)
        },
        default: 'small'
      },
      extraClass: {
        type: String,
        default: ''
      }
    },
    computed: {
      getLoadingSize() {
        switch (this.size) {
          case 'small':
            return 'scale-50'
          case 'medium':
            return 'scale-75'
          case 'large':
            return 'scale-100'
          default:
            return 'scale-50'
        }
      }
    }
  }
</script>

<style scoped>
  .lds-ring {
    cursor: inherit;
    display: block;
    position: inherit;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
