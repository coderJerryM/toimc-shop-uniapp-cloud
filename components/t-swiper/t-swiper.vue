<template>
  <view>
    <u-swiper
      :list="list"
      keyName="image"
      showTitle
      :autoplay="true"
      circular
      height="180"
    >
      <view slot="indicator" class="indicator">
        <view
          class="indicator__dot"
          v-for="(item, index) in list"
          :key="index"
          :class="[index === current && 'indicator__dot--active']"
        >
        </view>
      </view>
    </u-swiper>
  </view>
</template>

<script>
export default {
  name: 't-swiper',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({}),
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
.indicator {
  @include flex(row);
  justify-content: center;

  &__dot {
    height: 6px;
    width: 6px;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.35);
    margin: 0 5px;
    transition: background-color 0.3s;

    &--active {
      background-color: #ffffff;
    }
  }
}
</style>
