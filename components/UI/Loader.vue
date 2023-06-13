<template>
    <client-only>
        <div class="loader-wrapper">
            <Vue3Lottie
                class="loader"
                :animationData="loaderJSON"
                :height="300"
                :width="300"
            />
        </div>
    </client-only>
</template>

<script setup>
import loaderJSON from "~/assets/img/loader.json";
</script>
