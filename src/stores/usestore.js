import { defineStore } from 'pinia'
import api from '@/services/api'


export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    isLoading: false,
    error: null
  }),

  getters: {
    totalUsers: (state) => state.users.length
  },

  actions: {
    async fetchUsers() {
      this.isLoading = true
      this.error = null
      try {
        const response = await api.get('/users')
        this.users = response.data
      } catch (err) {
        this.error = err.message || 'Erro ao buscar usuários'
        console.error(err)
      } finally {
        this.isLoading = false
      }
    },

    addUser(user) {
      this.users.push(user)
    }
  }
})