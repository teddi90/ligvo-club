<template>
    <div>
        <HeaderNav />
        <NuxtPage />

        <Map />
        <Footer />
    </div>
</template>
<script setup>
import { useGamesStore } from "~/stores/games";
const store = useGamesStore();
store.fetchAllGames();
</script>
