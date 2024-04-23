import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faBell, faChartSimple, faChevronDown, faChevronRight, faList, faMagnifyingGlass, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faList)
library.add(faBars)
library.add(faMagnifyingGlass)
library.add(faBell)
library.add(faUser)
library.add(faPlus)
library.add(faChevronDown)
library.add(faChevronRight)
library.add(faChartSimple)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
