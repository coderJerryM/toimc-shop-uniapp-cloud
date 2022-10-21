<template>
  <view class="center">center
    <t-user-info></t-user-info>
    <t-settings></t-settings>
    <t-orders></t-orders>
    <t-recommend :list="recommend"></t-recommend>
    <view class="bottom-line"></view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    recommend: [],
  }),
  computed: {},
  methods: {},
  watch: {},

  // 页面周期函数--监听页面加载
  async onLoad() {
    const recommendData = await this.$api.json('recommendList')
    this.recommend = recommendData
  },
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

<style>
.center {
  background: #f4f6f8;
  min-height: 100vh;
}
</style>
