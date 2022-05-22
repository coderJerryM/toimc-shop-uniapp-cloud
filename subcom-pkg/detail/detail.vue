<template>
  <view class="detail" :class="{ ipx: ipxFlag }">
    <view class="detail-content">
      <!-- 轮播图 -->
      <u-swiper
        :list="list6"
        @change="(e) => (currentNum = e.current)"
        :autoplay="true"
        indicatorStyle="right: 20px"
        circular
        height="360"
      >
        <view slot="indicator" class="indicator-num">
          <text class="indicator-num__text"
            >{{ currentNum + 1 }}/{{ list6.length }}</text
          >
        </view>
      </u-swiper>
      <view class="info">
        <view class="info-head">
          <view class="info-head-price">¥<text>4.80</text></view>
          <view class="info-head-title">
            <text
              >四季通用汽车玻璃水四季通用汽车玻璃水四季通用汽车玻璃水四季通用汽车玻璃水四季通用汽车玻璃水</text
            >
            <view class="share-right">
              <uni-icons type="redo-filled" size="20"></uni-icons>
              <text>分享</text>
            </view>
          </view>
        </view>
        <uni-list class="insurance">
          <uni-list-item
            title="放心购"
            note="品质保证 退货包赔"
            showArrow
            :clickable="true"
            @click="handleInsurance()"
          />
        </uni-list>
        <view class="info-desc" style="margin-bottom: 15rpx; margin-top: 15rpx">
          <view class="info-desc-freight">运费<text>¥ 0.00-25.00</text></view>
          <view>已售 115</view>
        </view>
        <view class="info-desc">
          <view class="info-desc-freight">服务<text>合作商直销</text></view>
          <uni-icons type="right" size="20"></uni-icons>
        </view>
        <view class="info-desc">
          <view class="info-desc-freight">选择<text>规格；类型</text></view>
          <uni-icons type="right" size="20"></uni-icons>
        </view>
        <!-- 商店入口 -->
        <view class="info-entrance">
          <view class="info-entrance-left">
            <image src="../../static/images/1.jpeg" mode="" class="img" />
            <view class="name">
              <text>toimc商城</text>
              <view class="name-cert">企业认证</view>
            </view>
          </view>
          <view class="btn" @click="goToHome">进店逛逛</view>
        </view>
        <!-- 商品详情 -->
        <view class="product-detail">
          <image
            class="product-detail-img"
            src="../../static/images/211.jpeg"
            mode=""
          />
        </view>
        <view class="product-desc" @click="handleDescShow">
          <u-divider text="商品说明 >"></u-divider>
        </view>
        <view class="product-desc-show" v-if="isDesc">
          <view class="content">
            划线价格划线价格划线价格划线价格划线价格划线价格划线价格划线价格划线价格划线价格
          </view>
        </view>
        <!-- 更多推荐 -->
        <view style="background: #fff">
          <t-recommend :list="recommend"></t-recommend>
        </view>
      </view>
      <view style="height: 150rpx"></view>
    </view>
    <view class="goods-carts">
      <uni-goods-nav
        :options="options"
        :fill="true"
        :button-group="buttonGroup"
        @click="onClick"
        @buttonClick="buttonClick"
      />
    </view>
  </view>
</template>

<script>
import tRecommend from '@/components/t-recommend/t-recommend'
export default {
  components: {
    tRecommend,
  },
  data() {
    return {
      height: 0, //记录屏幕高度与底部调试的差值
      ipxFlag: false,
      isDesc: false,
      recommend: [],
      list6: [
        'https://cdn.uviewui.com/uview/swiper/swiper2.png',
        'https://cdn.uviewui.com/uview/swiper/swiper3.png',
        'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      ],
      currentNum: '',
      options: [
        {
          icon: 'chat',
          text: '客服',
        },
        {
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: '#f5f5f5',
        },
        {
          icon: 'cart',
          text: '购物车',
          info: 2,
        },
      ],
      buttonGroup: [
        {
          text: '加入购物车',
          backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
          color: '#fff',
        },
        {
          text: '立即购买',
          backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
          color: '#fff',
        },
      ],
    }
  },
  methods: {
    handleDescShow() {
      this.isDesc = !this.isDesc
    },
    goToHome() {
      uni.reLaunch({
        url: '/pages/home/home',
      })
    },
    onClick(e) {
      console.log(e)
      if (e.index === 1) {
        uni.reLaunch({
          url: '/pages/home/home',
        })
      } else if (e.index === 2) {
        this.$navTo('pages/cart/cart')
      }
      uni.showToast({
        title: `点击${e.content.text}`,
        icon: 'none',
      })
    },
    buttonClick(e) {
      console.log(e)
      this.options[2].info++
    },
    handleInsurance() {
      console.log('放心购')
    },
  },
  async onLoad() {
    // this.loading = true
    const info = uni.getSystemInfoSync()
    console.log(info.safeArea)
    this.height = info.screenHeight - info.safeArea.bottom
    if (this.height > 0) this.ipxFlag = true
    const detailData = await this.$api.json('detailData')
    const recommendData = await this.$api.json('recommendList')
    this.recommend = recommendData
    uni.setNavigationBarTitle({
      title: detailData.title,
    })
  },
  onShareAppMessage() {
    // 微信分享
    return {
      title: this.page.title,
      path: '/subcom-pkg/detail/detail?tid=' + this.page._id,
    }
  },
}
</script>

<style lang="scss">
.detail {
  background: #f4f6f8;
  min-height: 100vh;
  &.ipx {
    .goods-carts,
    .detail-content {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
  .detail-content {
    height: 100%;
  }
}

.info {
  width: 100%;
  &-head {
    box-sizing: border-box;
    margin-top: 15rpx;
    margin-bottom: 15rpx;
    padding: 15rpx 25rpx;
    width: 100%;
    background: #fff;
    &-price {
      margin-top: 5rpx;
      margin-bottom: 10rpx;
      font-size: 16px;
      color: #fc0000;
      font-weight: bold;
      text {
        margin-left: 4rpx;
        font-size: 22px;
      }
    }
    &-title {
      display: flex;

      text {
        flex: 1;
        font-size: 16px;
        font-weight: 400;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .share-right {
        margin-left: 6rpx;
        width: 50rpx;
        height: 100%;
        display: flex;
        flex-direction: column;
        text {
          font-size: 12px;
          color: #a3a4a5;
          font-weight: normal;
        }
      }
    }
  }
  &-desc {
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    height: 90rpx;
    padding: 0 25rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #a3a4a5;
    font-size: 14px;
    &-freight {
      text {
        margin-left: 20rpx;
        color: #000;
      }
    }
  }
  &-entrance {
    margin-top: 15rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    width: 100%;
    height: 140rpx;
    padding: 0 25rpx;
    box-sizing: border-box;
    &-left {
      display: flex;
      align-items: center;
      .img {
        width: 100rpx;
        height: 100rpx;
        border-radius: 10px;
        margin-right: 15rpx;
      }
      .name {
        display: flex;
        flex-direction: column;
        text {
          font-size: 17px;
        }
        &-cert {
          margin-top: 13rpx;
          width: 130rpx;
          text-align: center;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          background: #d90404;
        }
      }
    }
    .btn {
      width: 130rpx;
      height: 50rpx;
      line-height: 50rpx;
      border-radius: 50px;
      border: 1px solid #fc0000;
      font-size: 12px;
      color: #fc0000;
      text-align: center;
    }
  }
}

.product-detail {
  padding: 10rpx 10rpx;
  width: 100%;
  box-sizing: border-box;
  &-img {
    width: 100%;
    height: 1200rpx;
  }
}
.product-desc {
  margin-top: -20rpx;
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  color: #000;
  background: #fff;
}
.product-desc-show {
  box-sizing: border-box;
  padding: 5rpx 30rpx 30rpx 30rpx;
  width: 100%;
  background: #fff;
  .content {
    border-radius: 3px;
    box-sizing: border-box;
    padding: 15rpx;
    color: #a3a4a5;
    font-size: 12px;
    font-weight: normal;
    background: #f2f5f7;
  }
}

//轮播图指示器
.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;

  &__text {
    color: #ffffff;
    font-size: 12px;
  }
}

// 底部商品导航
.goods-carts {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  /* #ifdef H5 */
  left: var(--window-left);
  right: var(--window-right);
  /* #endif */
  bottom: 0;
}

.insurance {
  margin-bottom: 15rpx;
  .uni-list-item__content-title {
    font-size: 17px !important;
    color: green !important;
    font-weight: 700;
  }
}
</style>
