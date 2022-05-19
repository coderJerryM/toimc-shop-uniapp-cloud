<template>
  <view class="home">
    <t-search @click="handle()"></t-search>
    <!-- 头部轮播 -->
    <t-swiper :list="carouselList"></t-swiper>
    <!-- tabs -->
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="categoryList"
        lineWidth="45"
        lineColor="#f56c6c"
        :current="current"
        :scrollable="false"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        itemStyle="padding-left: 20px; padding-right: 20px; height: 50px;"
        @click="tabClick"
      ></u-tabs>
    </u-sticky>
    <!-- 分类 -->
    <scroll-view
      scroll-with-animation
      scroll-y
      class="container"
      @scroll="handleScroll"
      :scroll-top="tabScrollTop"
    >
      <view v-for="item in flist" :key="item.id" :id="'main-' + item.id">
        <view class="list">
          <view v-if="item.desc" class="members-head">
            <h1>{{ item.name }}</h1>
            <text>{{ item.desc }}</text>
          </view>
          <view v-else class="list-head">{{ item.name }}</view>
          <view class="list-body">
            <block v-for="titem in slist" :key="titem.id">
              <view class="list-item">
                <image class="list-item-img" :src="titem.image" mode="" />
                <view class="list-item-footer">
                  <view class="list-item-footer-text">{{ titem.title }}</view>
                  <view class="list-item-footer-price">
                    ¥<text>{{ titem.price }}</text>
                  </view>
                </view>
              </view>
            </block>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- about -->
    <image class="about" :src="aboutImg" mode="" />
    <view class="bottom-line"></view>
  </view>
</template>

<script>
import tSearch from '../../components/t-search/t-search.vue'
import tSwiper from '../../components/t-swiper/t-swiper'
export default {
  components: {
    tSearch,
    tSwiper,
  },
  data: () => ({
    carouselList: [],
    categoryList: [],
    flist: [],
    slist: [],
    aboutImg: '',
    sizeCalcState: false,
    tabScrollTop: 0,
    current: 0,
  }),
  computed: {},
  methods: {
    handle() {
      uni.navigateTo({
        url: '/subcom-pkg/search/search',
      })
    },
    async loadData() {
      let carouselList = await this.$api.json('carouselList')
      this.carouselList = carouselList

      let categoryList = await this.$api.json('categoryList')
      categoryList.forEach((item) => {
        if (!item.pid) {
          this.categoryList.push(item)
        } else if (!item.image) {
          this.flist.push(item)
        } else {
          this.slist.push(item)
        }
      })

      let aboutImg = await this.$api.json('aboutImg')
      this.aboutImg = aboutImg
    },
    tabClick(item) {
      if (!this.sizeCalcState) {
        this.calcSize()
      }
      this.current = item.index
      let index = this.flist.findIndex((sitem) => sitem.pid === item.id)
      this.$nextTick(() => {
        uni.pageScrollTo({
          scrollTop: this.flist[index].top + 260,
          duration: 300,
        })
      })
    },
    handleScroll(e) {
      if (!this.sizeCalcState) {
        this.calcSize()
      }
      let scrollTop = e.scrollTop - 250
      let tabs = this.flist.filter((item) => item.top <= scrollTop).reverse()
      if (tabs.length > 0) {
        this.current = tabs[0].pid - 1
      }
    },
    calcSize() {
      let h = 30
      this.flist.forEach((item) => {
        let view = uni.createSelectorQuery().select('#main-' + item.id)
        view
          .fields(
            {
              size: true,
            },
            (data) => {
              item.top = h
              h += data.height
              item.bottom = h
            }
          )
          .exec()
      })
      this.sizeCalcState = true
    },
  },
  watch: {},
  onPageScroll(res) {
    this.handleScroll(res)
  },
  // 页面周期函数--监听页面加载
  onLoad() {
    this.loadData()
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

<style lang="scss" scoped>
page,
.home {
  height: 100%;
  background-color: #f8f8f8;
}

.container {
  box-sizing: border-box;
  padding: 16rpx 15rpx;
  overflow: hidden;
  .members-head {
    padding: 5px;
    margin-top: 10rpx;
    margin-bottom: 8px;
    box-sizing: border-box;
    h1 {
      color: #ff8484;
      font-weight: 500;
    }
    text {
      font-size: 12px;
      color: #999a9c;
      margin-top: 8px;
    }
  }
  .list {
    &-head {
      margin: 10px 0 15px 10px;
      font-size: 16px;
      font-weight: 700;
    }
    &-body {
      display: flex;
      flex-wrap: wrap;
      .list-item {
        margin-right: 13rpx;
        width: 31%;
        height: 400rpx;
        &-img {
          width: 100%;
          height: 110px;
        }
        &-footer {
          &-text {
            padding: 0 6rpx;
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
        }
      }
    }
  }
}
.about {
  width: 100%;
  height: 1250rpx;
}
</style>
