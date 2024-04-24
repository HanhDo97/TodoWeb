import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faBell, faBoltLightning, faCalendarDays, faChartColumn, faChartSimple, faChevronDown, faChevronLeft, faChevronRight, faEllipsis, faEllipsisH, faEllipsisV, faEllipsisVertical, faFilter, faGear, faList, faMagnifyingGlass, faPencil, faPlus, faRocket, faStar, faTable, faUser, faUserPlus, faUsersRays } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faList)
library.add(faBars)
library.add(faMagnifyingGlass)
library.add(faBell)
library.add(faUser)
library.add(faPlus)
library.add(faChevronDown)
library.add(faChevronRight)
library.add(faChevronLeft)
library.add(faChartSimple)
library.add(faGear)
library.add(faUserPlus)
library.add(faChartColumn)
library.add(faTable)
library.add(faCalendarDays)
library.add(faStar)
library.add(faUsersRays)
library.add(faRocket)
library.add(faBoltLightning)
library.add(faFilter)
library.add(faEllipsis)
library.add(faPencil)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
