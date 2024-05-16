import { defineStore } from 'pinia'
import { nanoid } from 'nanoid';
import TodoService from '@/services/TodoService';
import TaskService from '@/services/TaskService';
import { useCookies } from "vue3-cookies";

export const useProjectStore = defineStore('project', {
    state: () => ({
        projects: [],
        currentProject: null,
        todos: []
    }),
    actions: {
        initProject(projects) {
            this.projects = projects;

            // Set the last project
            let { cookies } = useCookies();
            let lastProjectId = cookies.get('last_project');
            let index = 0;
            if (lastProjectId !== null) {
                index = this.projects.findIndex(el => el.id == lastProjectId);
            }
            this.currentProject = this.projects[index];

            this.todos = this.currentProject.todos
        },
        changeProject(idProject) {
            let index = this.projects.findIndex(el => el.id == idProject);
            this.currentProject = this.projects[index];
            this.todos = this.currentProject.todos;
        },

        updateList(payload) {
            let listEleIndex = this.todos.findIndex((el) => el.id == payload.id)

            this.todos[listEleIndex].title = payload.title;

            TodoService.update(payload)
        },
        pushNewList(payload) {
            this.todos.push(payload);

            TodoService.create(payload, this.currentProject)
        },
        pushNewTask(payload) {
            let task = {
                id: nanoid(),
                title: payload.value,
            }
            let listIndex = this.todos.findIndex((el) => el.id == payload.id);
            this.todos[listIndex].tasks.push(task)

            TaskService.create(task, payload.id)
        },
        updateTask(payload) {
            let listEleIndex = this.todos.findIndex((el) => el.id == payload.idList)
            let taskEleIndex = this.todos[listEleIndex].tasks.findIndex((el) => el.id == payload.id)

            this.todos[listEleIndex].tasks[taskEleIndex].title = payload.title

            TaskService.update(payload, payload.id)
        },

        updateTaskId(listId, oldId, newId) {
            let listEleIndex = this.todos.findIndex((el) => el.id == listId)
            let taskEleIndex = this.todos[listEleIndex].tasks.findIndex((el) => el.id == oldId)

            this.todos[listEleIndex].tasks[taskEleIndex].id = newId;
        },
        showAddNewCardTemplate(id) {
            this.todos.forEach((el) => {
                if (el.id !== id) {
                    el.addNewCardStatus = false;
                }
            });
        },
        getTodoById(id) {
            let i = this.todos.findIndex(el => el.id == id);
            return this.todos[i];
        }
    }
})
