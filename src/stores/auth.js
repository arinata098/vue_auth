import { defineStore } from "pinia";
import axios from "axios";

const token = localStorage.getItem('token');

export const useAuthStore = defineStore("auth" , {
    state: () => ({
        authUser: null,
    }),
    getters: {
        user: (state) => state.authUser,
    },
    actions: {
        async getUser() {
            try {
                const response = await axios.get('/api/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                this.authUser = response.data; //simpan ke state
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    }
})