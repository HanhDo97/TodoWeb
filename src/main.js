import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAddressCard, faBars, faBell, faBoltLightning, faBox, faCalendarDays, faChartColumn, faChartSimple, faCheck, faChevronDown, faChevronLeft, faChevronRight, faClock, faCopy, faEllipsis, faEllipsisVertical, faFilter, faGear, faGripVertical, faImage, faList, faMagnifyingGlass, faPencil, faPlus, faRightFromBracket, faRightLong, faRocket, faStar, faTable, faTag, faUser, faUserPlus, faUsersRays, faXmark } from '@fortawesome/free-solid-svg-icons'

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
library.add(faEllipsisVertical)
library.add(faPencil)
library.add(faAddressCard)
library.add(faTag)
library.add(faImage)
library.add(faClock)
library.add(faRightLong)
library.add(faCopy)
library.add(faBox)
library.add(faXmark)
library.add(faCheck)
library.add(faRightFromBracket)
library.add(faGripVertical)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
