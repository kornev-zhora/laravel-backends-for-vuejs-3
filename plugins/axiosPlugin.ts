import axios from "axios";

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig();

    // Only run on client-side
    if (process.client) {
        console.log("🌍 Running Axios plugin on client-side");

        axios.defaults.baseURL = `${config.public.appURL}/api`;
        axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.defaults.headers.common["Content-Type"] = "application/json";
        axios.defaults.withCredentials = true;

        try {
            await axios.get(`${config.public.appURL}/sanctum/csrf-cookie`);
            console.log("✅ CSRF cookie fetched, Axios ready for requests");
        } catch (err) {
            console.error("❌ Failed to fetch CSRF cookie", err);
        }
    }
});
