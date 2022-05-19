<template>
  <view class="search" @click="$emit('click')">
    <view class="search-box">
      <u-icon name="search" color="#CCC" size="20" class="icon"></u-icon>
      <text>搜索商品</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 't-serach',
  props: {},
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
.search {
  width: 100vw;
  height: 70rpx;
  background: #f8f8f8;
  padding-top: 5rpx;
  .search-box {
    margin: 0 auto;
    padding: 0 15rpx;
    width: 92%;
    height: 70rpx;
    display: flex;
    align-items: center;
    background: #fff;
    font-size: 14px;
    color: #b7adad;
    box-sizing: border-box;
    border-radius: 5px;
    text {
      margin-left: 20rpx;
    }
  }
}
</style>
