<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
    email: '',
    password: ''
})

const handleLogin = async () => {
    try {
        const response = await axios.post("/api/login", {
            email: form.value.email,
            password: form.value.password
        });

        // Cek jika respons memiliki token
        if (response.data.token) {
            // Jika login berhasil, simpan token di localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect ke halaman utama atau halaman lain yang sesuai
            router.push('/');
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

</script>

<template>
    <div>
        <div class="min-h-screen flex items-center justify-center w-full">
            <div class="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 class="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back!</h1>
                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                        <input 
                            type="email" 
                            id="email"
                            v-model="form.email" 
                            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required>
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                        <input
                            v-model="form.password" 
                            type="password" id="password" class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required>
                        <a href="#"
                            class="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
                            Password?</a>
                    </div>
                    <div class="flex items-center justify-between mb-4">
                    
                        <a href="#"
                            class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                            Account</a>
                    </div>
                    <button onclick="" type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>