import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import(/* webpackChunkName: "news" */ './views/News.vue')
    },
    {
      path: '/news/:newsID',
      name: 'newspage',
      component: () => import(/* webpackChunkName: "newspage" */ './views/NewsPage.vue')
    },
    {
      path: '/donation',
      name: 'donation',
      component: () => import(/* webpackChunkName: "donation" */ './views/Donation.vue')
    },
    {
      path: '/donation/:donationID',
      name: 'donationPage',
      component: () => import(/* webpackChunkName: "donationpage" */ './views/DonationPage.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import(/* webpackChunkName: "product" */ './views/Product.vue'),
    },
    {
      path: '/product/:productID',
      name: 'productPage',
      component: () => import(/* webpackChunkName: "productpage" */ './views/ProductPage.vue'),
    },
    {
      path: '/product/keyword/:keyword',
      name: 'productBykeyword',
      component: () => import(/* webpackChunkName: "product" */ './views/Product.vue'),
    },
    {
      path: '/product/group/:groupID',
      name: 'productBygroupID',
      component: () => import(/* webpackChunkName: "product" */ './views/Product.vue'),
    },
    {
      path: '/question',
      name: 'question',
      component: () => import(/* webpackChunkName: "question" */ './views/Question.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import(/* webpackChunkName: "contact" */ './views/Contact.vue')
    },
    {
      path: '*',
      name: 'error',
      component: () => import(/* webpackChunkName: "about" */ './views/Error.vue')
    }
  ]
})
