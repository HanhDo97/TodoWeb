import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        infor: {
            id: '',
            name: '',
            email: '',
            privilege_id: ''
        },
        projects: [],
        currentProject: []
    }),
    actions: {
        setupUser(serverResponse) {
            this.infor.id = serverResponse.id;
            this.infor.email = serverResponse.email;
            this.infor.name = serverResponse.name;
            this.infor.privilege_id = serverResponse.privilege_id;

        },
        
    }
})
