import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  	routes: [
	    {
		    path: '/',
		    name: 'login',
		    component(resolve) {
		      	require.ensure(['../components/login.vue'], () => {
		        	resolve(require('../components/login.vue'))
		      	})
		    },
		    meta: {
		        title: '错误页'  // 页面标题
		    }
	    }
	]
})
