<template>
  <view class="search">
    <view class="search-box">
      <u-search
        v-model="searchValue"
        placeholder="搜索商品"
        placeholderColor="#ccc"
      ></u-search>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-if="historyList.length !== 0">
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
    <view class="history-box">
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
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.search {
  padding: 24rpx;
}
.search-box {
  padding-bottom: 30rpx;
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
</style>
