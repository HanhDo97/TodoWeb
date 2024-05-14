import { defineStore } from 'pinia'
import { nanoid } from 'nanoid';

export const useUserStore = defineStore('user', {
    state: () => ({
        infor: {
            id: '',
            name: '',
            email: '',
            privilege_id: ''
        },
        todos: [],
    }),
    actions: {
        setupUser(serverResponse) {
            this.infor.id = serverResponse.id;
            this.infor.email = serverResponse.email;
            this.infor.name = serverResponse.name;
            this.infor.privilege_id = serverResponse.privilege_id;

            this.todos = serverResponse.todos.map((el) => {
                el.addNewCardStatus = false;
                return el;
            });
        },
        pushNewCard(payload) {
            let task = {
                id: nanoid(),
                title: payload.value
            }
            let listIndex = this.todos.findIndex((el) => el.id == payload.id);
            this.todos[listIndex].tasks.push(task)
        }
    }
})
