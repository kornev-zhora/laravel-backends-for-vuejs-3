<script setup lang="ts">
import axios from 'axios';  
const {logout} = useAuth();
logout();

</script> 


<template>
  <div>Logging Out...</div>
</template>
