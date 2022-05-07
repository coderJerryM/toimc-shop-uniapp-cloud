<template>
  <view class="home">
    <t-search @click="handle()"></t-search>
    <u-swiper
      :list="list2"
      keyName="image"
      showTitle
      :autoplay="true"
      height="200"
      circular
    >
      <view slot="indicator" class="indicator">
        <view
          class="indicator__dot"
          v-for="(item, index) in list2"
          :key="index"
          :class="[index === current && 'indicator__dot--active']"
        >
        </view>
      </view>
    </u-swiper>
    <view class="bottom-line"></view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    list2: [
      {
        image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        title: '昨夜星辰昨夜风，画楼西畔桂堂东',
      },
      {
        image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
        title: '身无彩凤双飞翼，心有灵犀一点通',
      },
      {
        image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳',
      },
    ],
  }),
  computed: {},
  methods: {
    handle() {
      uni.navigateTo({
        url: '/subcom-pkg/search/search',
      })
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh()
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
}
</script>

<style lang="scss">
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
