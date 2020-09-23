import Vue from 'vue';
//ROUTER
import VueRouter from 'vue-router';
import App from './App.vue';
import Homepage from './components/Homepage.vue';
import dashboard from './components/dashboard.vue';
//CSS
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);


const routes = [

  { 
    path:'/home',
    component: Homepage,
  },
  // {
  //   path: '/signIn',
  //   component: signIn,
  // },
  // {
  //   path: '/signUp',
  //   component: signUp,
  // },
  {
    path: '/dashboard',
    component: dashboard,
  }
]
let router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
