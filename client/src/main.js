// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  async mounted () {
    const res = await axios.get('/api/book')
    this.articles = res.data
    const res2 = await axios.get('/api/cart')
    this.panier = res2.data
  },
  methods: {
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },
    async addArticleCart(article){
      const res = await axios.post('api/panier/', article)
      this.panier = res.data
    },
    async editArticleInCart(newArticle) {
      const res = await axios.put(`/api/panier/${newArticle.id}`, newArticle)
      this.panier = res.data
    },
    async removeFromPanier(id){
      const res = await axios.delete(`/api/panier/${id}`)
      this.panier = res.data
    },
    async payer(personne){
      const res = await axios.post('api/panier/pay', personne)
      .then(res => {
        this.panier.articles = []
        alert(res.data.message)
      })
    },
    async login(data) {
      await axios.post('/api/login', data).then(async response => {
          this.user = response.data.data;
          this.panier.articles = response.data.panier;
          router.replace('/');
      }).catch(error => {
          alert('Informations non valides !')
          this.invaliddata = true
      });
    }
  }
})
