<script>
export default {
  onLaunch: function () {
    console.warn(
      '当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！'
    )
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
@import '@/uni_modules/uview-ui/index.scss';
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';
/* #ifndef APP-NVUE */
@import '@/static/customicons.css';

// 设置整个项目的背景色
page {
  background-color: #ffffff;
}
.twoline-hide {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* #endif */
.example-info {
  font-size: 14px;
  color: #333;
  padding: 10px;
}
.bottom-line {
  position: fixed;
  bottom: -5px;
  left: 0;
  width: 100vw;
  height: 5px;
  box-shadow: 0 -5px 5px rgba(0, 0, 0, 0.05);
  z-index: 999;
}
</style>
