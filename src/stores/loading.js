import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
    const loading = ref({
        page: true,
        http: false,
    })

    function enableLoading(type) {
        loading.value[type] = true;
    }

    function disableLoading(type) {
        loading.value[type] = false;
    }

    return { loading, enableLoading, disableLoading }
})
