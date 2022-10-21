<template>
  <view class="cart">
    <!-- 页面顶部 -->
    <view v-if="list.length" class="head-info">
      <view class="cart-total">
        <text class="text-info">共</text>
        <text class="active">2</text>
        <text class="text-info">件商品</text>
      </view>
      <view class="cart-edit" @click="handleToggleMode">
        <view v-if="mode == 'normal'" class="normal">
          <text class="text-info">编辑</text>
        </view>
        <view v-if="mode == 'edit'" class="edit">
          <text class="text-info">完成</text>
        </view>
      </view>
    </view>
    <!-- 购物车商品列表 -->
    <view v-if="list.length" class="cart-list">
      <view class="cart-item" v-for="(item, index) in list" :key="index" @click.stop="onTargetGoods(item.id)">
        <label class="item-radio" @click.stop="handleCheckItem(item.id)">
          <radio class="radio" color="#fa2209" :checked="inArray(item.id, checkedIds)" />
        </label>
        <view class="goods-image">
          <image class="image" :src="item.image" mode="scaleToFill"></image>
        </view>
        <view class="item-content">
          <view class="goods-title"><text class="twoline-hide">{{ item.title }}</text></view>
          <!-- <view class="goods-props clearfix">
            <view
              class="goods-props-item"
              v-for="(props, idx) in item.goods.skuInfo.goods_props"
              :key="idx"
            >
              <text>{{ props.value.name }}</text>
            </view>
          </view> -->
          <view class="item-foot">
            <view class="goods-price">
              <text class="unit">￥</text>
              <text class="value">{{ item.price }}</text>
            </view>
            <view class="stepper">
              <u-number-box :min="1" :value="item.number" @change="onChangeStepper($event, item)" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 底部 -->
    <view v-if="list.length" class="footer-fixed">
      <label class="all-radio" @click="handleCheckAll">
        <radio class="radio" color="#fa2209" :checked="checkedIds.length > 0 && checkedIds.length === list.length" />
        <text class="text-info">全选</text>
      </label>
      <view class="total-info">
        <text class="text-info">合计：</text>
        <view class="goods-price">
          <text class="unit">￥</text>
          <text class="value">{{ totalPrice }}</text>
        </view>
      </view>
      <view class="cart-action">
        <view class="btn-wrapper">
          <!-- dev:下面的disabled条件使用checkedIds.join方式判断 -->
          <!-- dev:通常情况下vue项目使用checkedIds.length更合理, 但是length属性在微信小程序中不起作用 -->
          <view v-if="mode == 'normal'" class="btn-item btn-main" :class="{ disabled: checkedIds.join() == '' }" @click="handleOrder()">
            <text class="text-info">去结算
              {{ checkedIds.length > 0 ? `(${checkedIds.length})` : '' }}</text>
          </view>
          <view v-if="mode == 'edit'" class="btn-item btn-main" :class="{ disabled: !checkedIds.length }" @click="handleDelete()">
            <text>删除</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 购物车为空 -->
    <view class="cart-empty" v-if="list.length === 0">
      <u-empty mode="car" text="赶紧买点宝贝慰劳下自己吧" icon="http://cdn.uviewui.com/uview/empty/car.png">
      </u-empty>
      <text>购物车还是空的</text>
      <view class="btn">去逛逛</view>
    </view>
    <t-recommend :list="recommend"></t-recommend>
    <view style="height: 150rpx"></view>
    <view class="bottom-line"></view>
  </view>
</template>

<script>
import { inArray, debounce } from '@/utils/util'
import { checkLogin, setCartTotalNum, setCartTabBadge } from '@/common/util'

const CartIdsIndex = 'CartIds'
export default {
  components: {},
  data: () => ({
    inArray,
    mode: 'normal',
    list: [],
    recommend: [],
    isEmpty: false,
    // 购物车商品总数量
    total: null,
    // 选中的商品ID记录
    checkedIds: [],
    // 选中的商品总金额
    totalPrice: '0.00',
  }),
  computed: {},
  methods: {
    // 计算合计金额 (根据选中的商品)
    onCalcTotalPrice() {
      const app = this
      // 选中的商品记录
      const checkedList = app.list.filter((item) =>
        inArray(item.id, app.checkedIds)
      )
      // 计算总金额
      let tempPrice = 0
      checkedList.forEach((item) => {
        // 商品单价, 为了方便计算先转换单位为分 (整数)
        const unitPrice = item.price * 100
        tempPrice += unitPrice * item.number
      })
      app.totalPrice = (tempPrice / 100).toFixed(2)
    },

    // 切换当前模式
    handleToggleMode() {
      this.mode = this.mode == 'normal' ? 'edit' : 'normal'
    },
    // 全选事件
    handleCheckAll() {
      this.checkedIds =
        this.checkedIds.length === this.list.length
          ? []
          : this.list.map((item) => item.id)
    },
    // 跳转到商品详情页
    onTargetGoods(goodsId) {
      this.$navTo('subcom-pkg/detail/detail', { goodsId })
    },
    // 选中商品
    handleCheckItem(cartId) {
      const index = this.checkedIds.findIndex((id) => id === cartId)
      index < 0
        ? this.checkedIds.push(cartId)
        : this.checkedIds.splice(index, 1)
    },
    // 监听步进器更改事件
    onChangeStepper({ value }, item) {
      // 这里是组织首次启动时的执行
      if (item.number == value) return
      // 记录一个节流函数句柄
      if (!item.debounceHandle) {
        item.oldValue = item.number
        item.debounceHandle = debounce(this.onUpdateCartNum, 500)
      }
      // 更新商品数量
      item.goods_num = value
      // 提交更新购物车数量 (节流)
      item.debounceHandle(item, item.oldValue, value)
    },

    // 结算选中的商品
    handleOrder() {
      if (this.checkedIds.length) {
        const cartIds = this.checkedIds.join()
        // 跳转订单页
        this.$navTo('pages/checkout/index', { mode: 'cart', cartIds })
      }
    },

    // 删除选中的商品弹窗事件
    handleDelete() {
      const app = this
      if (!app.checkedIds.length) {
        return false
      }
      uni.showModal({
        title: '友情提示',
        content: '您确定要删除该商品吗？',
        showCancel: true,
        success({ confirm }) {
          // 确认删除
          confirm && app.onClearCart()
        },
      })
    },
    // 确认删除商品
    onClearCart() {
      // const app = this
      // CartApi.clear(app.checkedIds).then(() => {
      //   app.getCartList()
      //   app.handleToggleMode()
      // })
    },
  },
  watch: {
    // 监听选中的商品
    checkedIds: {
      handler(val) {
        // 计算合计金额
        this.onCalcTotalPrice()
        // 记录到缓存中
        uni.setStorageSync(CartIdsIndex, val)
      },
      immediate: false,
    },
    // 监听购物车商品总数量
    total(val) {
      // 缓存并设置角标
      setCartTotalNum(val)
      setCartTabBadge()
    },
  },

  // 页面周期函数--监听页面加载
  async onLoad() {
    const cartList = await this.$api.json('cartList')
    this.list = cartList
    const recommendData = await this.$api.json('recommendList')
    console.log(recommendData)
    this.recommend = recommendData
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    // 获取购物车商品列表
    checkLogin() ? this.getCartList() : (this.isLoading = false)
    // 获取缓存中的选中记录
    this.checkedIds = uni.getStorageSync(CartIdsIndex)
  },
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
.text-info {
  font-size: 28rpx;
}

.cart {
  background: #f4f6f8;
  min-height: 100vh;
  .head-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4rpx 30rpx;
    // background-color: #fff;
    height: 80rpx;

    .cart-total {
      font-size: 28rpx;
      color: #333;

      .active {
        color: #fa2209;
        margin: 0 2rpx;
      }
    }

    .cart-edit {
      padding-left: 20rpx;

      .icon {
        margin-right: 12rpx;
      }

      .edit {
        color: #fa2209;
      }
    }
  }
  // 购物车列表
  .cart-list {
    padding: 0 16rpx 110rpx 16rpx;
  }

  .cart-item {
    background: #fff;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
    padding: 30rpx 16rpx;
    margin-bottom: 24rpx;

    .item-radio {
      width: 56rpx;
      height: 80rpx;
      line-height: 80rpx;
      margin-right: 10rpx;
      text-align: center;

      .radio {
        transform: scale(0.76);
      }
    }

    .goods-image {
      width: 200rpx;
      height: 200rpx;

      .image {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 8rpx;
      }
    }

    .item-content {
      flex: 1;
      padding-left: 24rpx;

      .goods-title {
        font-size: 28rpx;
        max-height: 76rpx;
      }

      .goods-props {
        margin-top: 14rpx;
        height: 40rpx;
        color: #ababab;
        font-size: 24rpx;
        overflow: hidden;

        .goods-props-item {
          display: inline-block;
          margin-right: 14rpx;
          padding: 4rpx 16rpx;
          border-radius: 12rpx;
          background-color: #f5f5f5;
          width: auto;
        }
      }

      .item-foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20rpx;

        .goods-price {
          vertical-align: bottom;
          color: #fa2209;

          .unit {
            font-size: 24rpx;
          }

          .value {
            font-size: 32rpx;
          }
        }
      }
    }
  }
  // 底部操作栏
  .footer-fixed {
    display: flex;
    align-items: center;
    height: 96rpx;
    background: #fff;
    padding: 0 30rpx;
    position: fixed;
    bottom: var(--window-bottom);
    left: 0;
    right: 0;
    z-index: 11;

    .all-radio {
      width: 140rpx;
      display: flex;
      align-items: center;

      .radio {
        margin-bottom: -4rpx;
        transform: scale(0.76);
      }
    }

    .total-info {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 30rpx;

      .goods-price {
        vertical-align: bottom;
        color: #fa2209;

        .unit {
          font-size: 24rpx;
        }

        .value {
          font-size: 32rpx;
        }
      }
    }

    .cart-action {
      width: 200rpx;

      .btn-wrapper {
        height: 100%;
        display: flex;
        align-items: center;
      }

      .btn-item {
        flex: 1;
        font-size: 28rpx;
        height: 72rpx;
        line-height: 72rpx;
        text-align: center;
        color: #fff;
        border-radius: 50rpx;
      }

      // 立即购买按钮
      .btn-main {
        background: linear-gradient(to right, #f9211c, #ff6335);

        // 禁用按钮
        &.disabled {
          background: #ff9779;
        }
      }
    }
  }

  &-empty {
    position: relative;
    text {
      position: absolute;
      left: 35%;
      top: 60%;
      color: #b7b7b7;
    }
    .btn {
      margin: 20rpx auto;
      width: 150rpx;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 14px;
      color: #4d4949;
      background: #fff;
      text-align: center;
      border: 1rpx solid #eee;
    }
  }
}
</style>
