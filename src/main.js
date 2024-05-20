import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import vue3GoogleLogin from 'vue3-google-login'

import { faAddressCard, faBars, faBell, faBoltLightning, faBox, faCalendarDays, faChartColumn, faChartSimple, faCheck, faCheckCircle, faChevronDown, faChevronLeft, faChevronRight, faCircleXmark, faClock, faCopy, faEllipsis, faEllipsisVertical, faEye, faEyeSlash, faFilter, faGear, faGripVertical, faImage, faLink, faList, faMagnifyingGlass, faPencil, faPlus, faRightFromBracket, faRightLong, faRocket, faStar, faTable, faTag, faUser, faUserPlus, faUsersRays, faXmark } from '@fortawesome/free-solid-svg-icons'

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
library.add(faEye)
library.add(faEyeSlash)
library.add(faCircleXmark)
library.add(faCheckCircle)
library.add(faLink)


const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '1003164627541-211kf5pn09g2oc04t6n6s2l1kq5lpheo.apps.googleusercontent.com'
})

app.mount('#app')
