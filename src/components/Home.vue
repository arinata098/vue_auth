<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref();
const token = localStorage.getItem('token');

onMounted(async () => {
    try {
        const response = await axios.get('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);
        user.value = response.data; // Simpan data pengguna dalam variabel reaktiv
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
});
</script>

<template>
    <div>
        <h1>Home</h1>
    </div>
</template>

<style scoped>

</style>