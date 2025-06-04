<!-- /**
  Login.vue
 
  Description:
    Renders a simple login button that allows users to access the application.
    Clicking the button will automatically log in the user.
 / -->

<template>
    <div class="login-container">
        <div class="card">
            <h2>Welcome to SchoolMate</h2>
            <p>Click the button below to start exploring</p>
            <button @click="login">Explore</button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { isLoggedIn } from '../auth.js';

const router = useRouter();

const login = () => {
  localStorage.setItem('isLoggedIn', 'true');
  isLoggedIn.value = true;
  router.push('/home');
};

</script>

<style scoped>
.login-container {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #f0f2f5, #d9e2ec);
    font-family: 'Segoe UI', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.card {
    background: #ffffff;
    width: 360px;
    padding: 40px 30px;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    text-align: center;
}

.card h2 {
    margin: 0 0 10px;
    font-size: 24px;
    color: #333;
}

.card p {
    margin-bottom: 30px;
    color: #666;
    font-size: 14px;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background-color: #005fa3;
}
</style>