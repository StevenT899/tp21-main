<!-- /**
  Login.vue
 
  Description:
    Renders the sign-in form for users, including username and password inputs,
    and a submit button to authenticate via API.

 / -->

<template>
    <div class="login-container">
        <div class="card">
            <h2>Sign in</h2>
            <p>Sign in to your account</p>
            <label for="username">Username</label>
            <input type="text" v-model="username" id="username" placeholder="Enter username">
            <label for="password">Password</label>
            <input :type="passwordType" v-model="password" id="password" placeholder="Enter password">
            <div class="actions">
                <label><input type="checkbox" @click="togglePassword"> Show password</label>
            </div>
            <button @click="login">Continue</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { isLoggedIn } from '../auth.js';

const username = ref('');
const password = ref('');
const passwordType = ref('password');
const router = useRouter();

const togglePassword = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
};

const login = async () => {
  const user = username.value.trim();
  const pass = password.value.trim();
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass })
    });

    if (response.status === 401) {
      const err = await response.json();
      return alert(err.message);
    }
    if (!response.ok) {
      throw new Error(`Server error ${response.status}`);
    }

    const data = await response.json();
    if (data.success) {
      localStorage.setItem('isLoggedIn', 'true');
      isLoggedIn.value = true;
      router.push('/home');
    } else {
      alert(data.message);
    }
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
}

.card p {
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
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

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: -10px;
    margin-bottom: 20px;
}

.actions label {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #666;
    cursor: pointer;
}

.actions input {
    margin-right: 6px;
}

.actions a {
    font-size: 13px;
    color: #0078d4;
    text-decoration: none;
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