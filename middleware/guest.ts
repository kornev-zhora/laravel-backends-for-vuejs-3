export default defineNuxtRouteMiddleware(async (to, from) => {
    const { user, initUser } = useAuth();
    
    try {
        await initUser();
    } catch (error) {
        console.log('Error in guest middleware initUser:', error);
    }
    
    if (user.value) {
        return navigateTo('/me');
    }
})
