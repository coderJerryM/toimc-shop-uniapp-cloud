<template>
  <!--  暂时是无用组件 -->
  <view>
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

    <scroll-view
      scroll-with-animation
      scroll-y
      class="container"
      @scroll="handleScroll"
      :scroll-top="tabScrollTop"
    >
      <view v-for="item in flist" :key="item.id" :id="'main-' + item.id">
        <view v-if="item.desc" class="members">
          <view class="members-head">
            <h1>{{ item.name }}</h1>
            <text>{{ item.desc }}</text>
          </view>
          <view class="members-list">
            <block v-for="sitem in slist" :key="sitem.id">
              <view class="members-list-item">
                <image class="item-img" :src="sitem.image" />
                <view class="members-list-item-desc">
                  <view class="members-list-item-desc-text">
                    {{ sitem.title }}
                  </view>
                  <view class="members-list-item-desc-footer">
                    <view class="members-list-item-desc-footer-price">
                      ¥<text>{{ sitem.price }}</text>
                    </view>
                    <u-icon name="shopping-cart" color="#fd5f5f" size="22" />
                  </view>
                </view>
              </view>
            </block>
          </view>
        </view>
        <view v-else class="list">
          <view class="list-head">{{ item.name }}</view>
          <view class="list-body">
            <block v-for="titem in nlist" :key="titem.id">
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
      <!-- about -->
      <image class="about" :src="about" mode="" />
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: 't-tabs',
  props: {
    categoryList: {
      type: Array,
      default: () => [],
    },
    flist: {
      type: Array,
      default: () => [],
    },
    slist: {
      type: Array,
      default: () => [],
    },
    tlist: {
      type: Array,
      default: () => [],
    },
    nlist: {
      type: Array,
      default: () => [],
    },
    about: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      sizeCalcState: false,
      tabScrollTop: 0,
      current: 0,
    }
  },
  methods: {
    tabClick(item) {
      if (!this.sizeCalcState) {
        this.calcSize()
      }

      this.current = item.index
      let index = this.flist.findIndex((sitem) => sitem.pid === item.id)
      this.tabScrollTop = this.flist[index].top
      console.log(this.flist[index].top)
      uni.pageScrollTo({
        scrollTop: this.flist[index].top,
        duration: 300,
      })
    },
    handleScroll(e) {
      if (!this.sizeCalcState) {
        this.calcSize()
      }
      let scrollTop = e.detail.scrollTop
      let tabs = this.flist.filter((item) => item.top <= scrollTop).reverse()
      console.log(tabs)
      if (tabs.length > 0) {
        this.current = tabs[0].pid - 1
      }
    },
    calcSize() {
      let h = 0
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
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 16rpx;
  height: 1300rpx;
  .members {
    &-head {
      padding: 5px;
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
    &-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      &-item {
        margin: 5px;
        width: 44%;
        height: 280px;
        .item-img {
          width: 100%;
          height: 200px;
        }
        &-desc {
          padding: 15rpx;
          box-sizing: border-box;

          &-text {
            width: 100%;
            height: 40px;
            font-size: 13px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &-footer {
            display: flex;
            justify-content: space-between;
            color: #fd5f5f;
            &-price {
              font-size: 12px;

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
  .product {
    margin-top: 25px;
    &-head {
      padding: 0 15px;
      margin-bottom: 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-title {
        font-weight: bold;
        font-size: 17px;
      }
      &-more {
        display: flex;
        font-size: 13px;
        font-weight: 500;
        color: #929292;
      }
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
      &-item {
        margin: 5px;
        width: 30%;
        height: 200px;
        border: 1px solid #ededed;
        border-radius: 10px;
        &-img {
          border-radius: 10px;
          width: 100%;
          height: 120px;
        }
        &-footer {
          padding: 10rpx;
          box-sizing: border-box;
          &-text {
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
  .list {
    &-head {
      margin: 10px 0 15px 10px;
      font-size: 16px;
    }
    &-body {
      display: flex;
      flex-wrap: wrap;
      .list-item {
        box-sizing: border-box;
        margin: 4px;
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
