// composables/useAuth.ts
import axios from "axios";

interface User {
    id: number;
    name: string;
    email: string;
    two_factor_confirmed_at?: Date;
    two_factor_recovery_codes?: number;
    two_factor_secret?: string;
    updated_at: Date;
    created_at: Date;
}

async function getUser(): Promise<User | null> {
    try {
        const res = await axios.get("/user");
        const userData = res.data;
        return {
            ...userData,
            created_at: new Date(userData.created_at),
            updated_at: new Date(userData.updated_at),
            two_factor_confirmed_at: userData.two_factor_confirmed_at
                ? new Date(userData.two_factor_confirmed_at)
                : null,
            email_verified_at: userData.email_verified_at
                ? new Date(userData.email_verified_at)
                : null,
        };
    } catch (error: any) {
        if (error.response?.status === 401) {
            console.log('User not authenticated');
        }
        return null;
    }
}

export const useAuth = () => {
    // ✅ Use useState instead of ref for shared state
    const user = useState<User | null>('auth-user', () => null);

    async function initUser() {
        // ✅ Only fetch if user is not already loaded
        if (!user.value) {
            console.log('📡 Fetching user from API...');
            user.value = await getUser();
        } else {
            console.log('✅ User already cached, skipping API call');
        }
        return user.value;
    }

    interface LoginPayload {
        email: string;
        password: string;
    }

    async function login(payload: LoginPayload) {
        await axios.post("/login/", payload);
        await initUser();
        useRouter().push('/me');
    }

    async function logout() {
        await axios.post('/logout');
        user.value = null;
        useRouter().replace('/login');
    }

    interface RegisterPayload {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
    }

    async function register(payload: RegisterPayload) {
        await axios.post("/register/", payload);
        await login({
            email: payload.email,
            password: payload.password,
        });
    }

    return {
        user: readonly(user),
        initUser,
        login,
        logout,
        register,
    };
};