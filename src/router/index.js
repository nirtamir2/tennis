import Vue from 'vue'
import Router from 'vue-router'
import Score from '@/components/Score'
import NewPlayer from '@/components/NewPlayer'
import NewMatch from '@/components/NewMatch'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/score',
      name: 'Score',
      component: Score
    }, {
      path: '/NewMatch',
      name: 'NewMatch',
      component: NewMatch
    }, {
      path: '/NewPlayer',
      name: 'NewPlayer',
      component: NewPlayer
    },

  ]
})
