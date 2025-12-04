export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('🔒 Auth middleware running for:', to.path);

    const { user, initUser } = useAuth();

    try {
        await initUser();
        console.log('👤 User after initUser:', user.value);
    } catch (error) {
        console.log('❌ Error in initUser:', error);
    }

    if (!user.value) {
        console.log('🚫 No user found, redirecting to /login');
        return navigateTo('/login');
    }

    console.log('👤 User data:', JSON.stringify(user.value, null, 2));

});
