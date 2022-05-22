<template>
  <view class="search">
    <view class="search-box">
      <u-search
        v-model="searchValue"
        placeholder="搜索商品"
        placeholderColor="#ccc"
      ></u-search>
    </view>
    <view class="search-list" v-if="searchList.length !== 0 && showResult">
      <!-- 排序标签 -->
      <view class="store-sort">
        <view
          class="sort-item"
          :class="{ active: sortType === 'all' }"
          @click="handleSortType('all')"
        >
          <text>综合</text>
        </view>
        <view
          class="sort-item"
          :class="{ active: sortType === 'sales' }"
          @click="handleSortType('sales')"
        >
          <text>销量</text>
        </view>
        <view
          class="sort-item sort-item-price"
          :class="{ active: sortType === 'price' }"
          @click="handleSortType('price')"
        >
          <text>价格</text>
          <view class="price-arrow">
            <view
              class="icon up"
              :class="{ active: sortType === 'price' && !sortPrice }"
            >
              <text class="iconfont icon-arrow-up"></text>
            </view>
            <view
              class="icon down"
              :class="{ active: sortType === 'price' && sortPrice }"
            >
              <text class="iconfont icon-arrow-down"></text>
            </view>
          </view>
        </view>
      </view>
      <!-- 商品列表 -->
      <view class="goods-list">
        <view
          class="goods-item"
          v-for="sitem in searchList"
          :key="sitem.id"
          @click="onTargetDetail(sitem.goods_id)"
        >
          <!-- 商品图片 -->
          <view class="goods-item-left">
            <image class="image" :src="sitem.imageUrl"></image>
          </view>
          <view class="goods-item-right">
            <!-- 商品名称 -->
            <view class="goods-name">
              <text class="twoline-hide">{{ sitem.title }}</text>
            </view>
            <view class="goods-item-desc">
              <!-- 商品价格 -->
              <view class="price">
                ¥<text>{{ sitem.price }}</text>
              </view>
              <u-icon name="shopping-cart" color="#fd5f5f" size="22" />
            </view>
          </view>
        </view>
      </view>
      <!-- 更多推荐 -->
      <t-recommend :list="recommend"></t-recommend>
      <view style="height: 150rpx"></view>
    </view>
    <view v-else-if="searchList.length === 0 && showResult"> 暂无数据 </view>
    <!-- 搜索历史 -->
    <view
      class="history-box"
      v-if="historyList.length !== 0 && searchList.length === 0"
    >
      <view class="history-title">
        <text>历史搜索</text>
        <view class="history-clear">
          <u-icon name="trash" size="16" color="#ccc"></u-icon>
          <text>清空</text>
        </view>
      </view>
      <view class="history-list">
        <uni-tag
          :circle="true"
          :inverted="true"
          custom-style="margin-top:5px;margin-right:5px;border:1px solid #eee; color:#000"
          :text="item"
          v-for="(item, i) in historyList"
          :key="i"
        ></uni-tag>
      </view>
    </view>
    <!-- 热门搜索 -->
    <view class="history-box" v-if="!showResult">
      <view class="history-title">
        <text>热门搜索</text>
      </view>
      <view class="history-list">
        <uni-tag
          :circle="true"
          :inverted="true"
          custom-style="margin-top:5px;margin-right:5px;border:1px solid #eee; color:#000"
          :text="item"
          v-for="(item, i) in hotList"
          :key="i"
        ></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      searchValue: '',
      historyList: ['前端', 'vue', 'node', '面试', 'react'],
      hotList: ['前端', 'vue', 'node', '面试', 'react'],
      searchList: [],
      showResult: true,
      sortType: 'all', // 排序类型
      recommend: [],
    }
  },
  methods: {
    // 切换排序方式
    handleSortType(newSortType) {
      const newSortPrice = newSortType === 'price' ? !this.sortPrice : true
      this.sortType = newSortType
      this.sortPrice = newSortPrice
      // 刷新列表数据
      // this.list = getEmptyPaginateObj()
      this.mescroll.resetUpScroll()
    },
    // 跳转商品详情页
    onTargetDetail(goodsId) {
      this.$navTo('pages/detail/detail', { goodsId })
    },
  },
  async onLoad() {
    const info = uni.getSystemInfoSync()
    this.height = info.screenHeight - info.safeArea.bottom
    if (this.height > 0) this.ipxFlag = true

    const recommendData = await this.$api.json('recommendList')
    this.searchList = recommendData
    this.recommend = recommendData
  },
}
</script>

<style lang="scss" scoped>
.search {
  background: #f4f6f8;
}
.search-box {
  background: #fff;
  padding: 20rpx 25rpx;
  box-sizing: border-box;
}
.history-box {
  padding: 0 10rpx 50rpx;
  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 14px;
    font-weight: 400;
    .history-clear {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: 300;
      color: #ccc;
    }
    .history-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
}

// 排序组件
.store-sort {
  position: sticky;
  top: var(--window-top);
  display: flex;
  padding: 20rpx 0;
  font-size: 28rpx;
  background: #fff;
  color: #000;
  z-index: 99;

  .sort-item {
    flex-basis: 33.3333%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50rpx;

    &.active {
      color: #e49a3d;
    }
  }

  .sort-item-price .price-arrow {
    margin-left: 20rpx;
    font-size: 24rpx;
    color: #000;

    .icon {
      &.active {
        color: #e49a3d;
      }

      &.up {
        margin-bottom: -16rpx;
      }

      &.down {
        margin-top: -16rpx;
      }
    }
  }
}
// 搜索列表
.search-list {
  background: #f4f6f8;
}

// 商品列表
.goods-list {
  padding: 10rpx 24rpx;
  .goods-item {
    width: 100%;
    display: flex;
    margin-bottom: 20rpx;
    background: #fff;
    &-left {
      width: 280rpx;
      height: 280rpx;
      .image {
        width: 100%;
        height: 100%;
      }
    }
    &-right {
      position: relative;
      flex: 1;
      padding: 15rpx;
      .goods-name {
        padding: 10rpx 15rpx;
        box-sizing: border-box;
        white-space: normal;
        color: #484848;
        font-size: 13px;
      }
      .goods-item-desc {
        width: 90%;
        position: absolute;
        bottom: 35rpx;
        padding: 10rpx 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .price {
          color: #fd5f5f;
          padding: 10rpx;
          box-sizing: border-box;
          font-size: 13px;
          text {
            margin-left: 5rpx;
            font-size: 17px;
          }
        }
      }
    }
  }
}
</style>
