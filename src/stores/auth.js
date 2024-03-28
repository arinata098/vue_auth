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
        },
        async handleLogin(dataForm) {
            try {
                const response = await axios.post("/api/login", {
                    email: dataForm.email,
                    password: dataForm.password
                });
        
                // Cek jika respons memiliki token
                if (response.data.token) {
                    // Jika login berhasil, simpan token di localStorage
                    localStorage.setItem('token', response.data.token);
        
                    // Redirect ke halaman utama atau halaman lain yang sesuai
                    this.router.push('/');
                } else {
                    // Jika respons tidak memiliki token (login gagal), tampilkan pesan kesalahan atau lakukan penanganan lain sesuai kebutuhan
                    console.error('Login failed:', response.data.message);
                    // Tampilkan pesan kesalahan kepada pengguna atau lakukan penanganan kesalahan lainnya
                }
            } catch (error) {
                // Tangani kesalahan jika permintaan gagal, misalnya ketika tidak ada koneksi internet atau server tidak merespons
                console.error('Error logging in:', error);
                // Lakukan penanganan kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
            }
        }


    }
})