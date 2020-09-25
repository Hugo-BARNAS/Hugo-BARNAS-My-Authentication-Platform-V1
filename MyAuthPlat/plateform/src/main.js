//IMPORT VUE & VUEX
import Vue from 'vue';
import Vuex from 'vuex';
//ROUTER
import VueRouter from 'vue-router';
import App from './App.vue';
import Homepage from './components/Homepage.vue';
import dashboard from './components/dashboard.vue';
//CSS
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
//CALL VUEX
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

//STORE
import { store } from './store';


const routes = [

  {
    path: '/home',
    component: Homepage,
  },
  {
    path: '/dashboard',
    component: dashboard,
    meta: {
      requiresAuth: true
    }
  }
]


let router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && store.state.token.length > 0 ) {
      next()
    } else if (to.matched.some(record => record.meta.requiresAuth) && store.state.token.length === 0 ) {
      next('/home');
    } else {
    next();
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
