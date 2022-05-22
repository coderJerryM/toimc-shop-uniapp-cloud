<template>
  <view class="recommend">
          <view class="title">
            <u-divider text="更多精选商品"></u-divider>
          </view>
          <view class="recommend-list">
            <view class="recommend-list-item" v-for="item in list" :key="item.id">
              <image class="recommend-list-item-img" :src="item.imageUrl" alt="">
                <view class="recommend-list-item-footer">
                  <text class="recommend-list-item-footer-text">{{item.title}}</text>
                  <view class="recommend-list-item-footer-price">¥<text>{{item.price}}</text></view>
                  <view class="recommend-list-item-footer-hot" v-if="item.extendedData.rankType === 'hot_sale'">本店销量榜第{{item.extendedData.rankNo}}</view>
                  <view class="recommend-list-item-footer-hot" v-if="item.extendedData.rankType === 'popular'">本店人气榜第{{item.extendedData.rankNo}}</view>
                  <view class="recommend-list-item-footer-hot" v-if="item.extendedData.rankType === 'new_arrival'">本店新品榜第{{item.extendedData.rankNo}}</view>
                  </view> 
              </view>
          </view>
        </view>
</template>

<script>

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
  }),
  computed: {
  },
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

.recommend {
  margin-top: 20rpx;
  // background: #fff;
  .title {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
  }
  &-list {
    box-sizing: border-box;
    padding: 10rpx 25rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
      &-item {
        margin-bottom: 20rpx;
        width: 48.5%;
        height: 500rpx;
        background: #fff;
        border-radius: 5px;
        &-img {
          width: 100%;
          height: 290rpx;
          border-radius: 5px;
        }
        &-footer {
          padding: 10rpx;
          box-sizing: border-box;
          &-text {
            padding: 0 10rpx;
            box-sizing: border-box;
            width: 100%;
            height: 38px;
            font-size: 13px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &-price {
            color: #fd5f5f;
            padding: 10rpx;
            box-sizing: border-box;
            font-size: 13px;
            text {
              margin-left: 5rpx;
              font-size: 17px;
            }
          }
          &-hot{
            padding: 10rpx;
            box-sizing: border-box;
            font-size: 13px;
            color: #fd5f5f;
          }
        }
      }
  }
}
</style>
