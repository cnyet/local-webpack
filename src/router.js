import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './views/index.vue';
import List from './views/List.vue';
import Detail from './views/Detail.vue';

// 1. Use plugin.
Vue.use(VueRouter);

// 2. Define route components
const routes = [
  { path: '/', component: Index },
  { path: '/list', component: List },
  { path: '/detail', component: Detail }
]

// 3. Create the router
export default new VueRouter({ routes });
