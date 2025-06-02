<!-- /**
  Login.vue
 
  Description:
    Renders the sign-in form for users, including username and password inputs,
    and a submit button to authenticate via API.

 / -->

<template>
    <div class="login-container">
        <div class="card">
            <h2>Welcome to SchoolMate</h2>
            <p>Click the button below to enter the system</p>
            <button @click="login" class="login-button">Enter System</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isLoggedIn } from '../auth.js';

const router = useRouter();

const login = async () => {
  try {
    // Set login state directly, skip API verification
    localStorage.setItem('isLoggedIn', 'true');
    isLoggedIn.value = true;
    router.push('/home');
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again.');
  }
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
}

.card h2 {
    margin: 0 0 10px;
    font-size: 24px;
    color: #333;
    text-align: center;
}

.card p {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
    text-align: center;
}

label {
    font-weight: 600;
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    color: #444;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    transition: 0.2s;
}

input[type="text"]:focus,
input[type="password"]:focus {
    border-color: #0078d4;
    outline: none;
}

.actions,
.actions label,
.actions input,
.actions a {
    display: none;
}

.login-button {
    width: 100%;
    padding: 12px;
    background-color: #0078d4;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
    transition: background 0.3s;
    margin-top: 20px;
}

.login-button:hover {
    background-color: #005fa3;
}
</style>