<script setup lang="ts">
import axios, {AxiosError} from 'axios';
definePageMeta({
  layout: "centered",
  middleware: ["guest"],
});
const {login} = useAuth();
const form = ref({
  email: "",
  password: "",
});

const errors = ref({
  email: [],
  password: [],
});

async function handleLogin() {
  try {
    // Await the login function from the composable
    await login(form.value);
  } catch (err) {
    // Check if the error is an AxiosError and has a 422 status
    if (err instanceof AxiosError && err.response?.status === 422) {
      // Safely access the response data and cast it to ErrorResponse
      const errorData = err.response.data as ErrorResponse;

      // Store the specific field errors (e.g., email, password) in the errors ref
      // The keys in errorData.errors match the fields in the form
      errors.value = errorData.errors;

    } else {
      // Handle other types of errors (e.g., network issues, 500 server error)
      console.error("Login failed:", err);
    }
  }
}


</script>
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label>
        <div>Email</div>
        <input type="text" v-model="form.email"/>
        <div class="form-error" v-for="error in errors.email">{{ error }}</div>
      </label>

      <label>
        <div>Password</div>
        <input type="password" v-model="form.password"/>
        <div class="form-error" v-for="error in errors.password">{{ error }}</div>
      </label>
      <button class="btn">Login</button>
    </form>

    <p>
      Don't have an account?
      <NuxtLink class="underline text-lime-600" to="/register"
        >Register now!</NuxtLink
      >
    </p>
  </div>
</template>
