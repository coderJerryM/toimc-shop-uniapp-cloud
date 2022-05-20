// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'
import Json from './Json' //测试用数据

// mock模拟，后期会删除
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

Vue.config.productionTip = false

// mock数据
Vue.prototype.$api = {msg, json};

App.mpType = 'app'

Vue.use(uView)

const app = new Vue({
  ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
// #endif