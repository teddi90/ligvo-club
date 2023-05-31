import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
    const googleMapsApiKey = useRuntimeConfig().public.googleMapsApiKey;
    nuxtApp.vueApp.use(VueGoogleMaps, {
        load: {
            key: googleMapsApiKey,
        },
    });
});
