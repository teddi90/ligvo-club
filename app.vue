<template>
    <div>
        <HeaderNav />
        <NuxtPage />
    </div>
</template>
<script setup>
import { useGamesStore } from "~/stores/games";
const store = useGamesStore();

// const { data: resp } = await useFetch(
//     "https://ligvo-cms.grt-team.com/wp-json/wp/v2/boardgames"
// );
// console.log(resp);
store.fetchBoardGames();
</script>
