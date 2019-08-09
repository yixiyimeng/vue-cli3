/* 具体路由流程查看asssets/1.png */
import router from './router/index'
import store from './store/index'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({
	showSpinner: false
})
router.beforeEach((to, from, next) => {
	NProgress.start() // start progress bar
/* 判断 token 校验用户信息， */

})

router.afterEach(() => {
	NProgress.done() // finish progress bar
})
