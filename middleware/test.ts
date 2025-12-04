// middleware/test.global.ts or middleware/test.ts
export default defineNuxtRouteMiddleware((to, from) => {
    console.log('🧪 TEST MIDDLEWARE RUNNING for:', to.fullPath);
});
