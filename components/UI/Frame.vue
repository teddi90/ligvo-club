<template>
    <div class="frame" :class="{ down: downFrame }">
        <img
            v-if="downFrame"
            class="frame__img"
            src="~/assets/img/arrows_down.png"
            alt="Arrows"
        />
        <img
            v-else
            class="frame__img"
            src="~/assets/img/arrows.png"
            alt="Arrows"
        />
    </div>
</template>

<script setup>
defineProps({
    downFrame: Boolean,
    default: false,
});
</script>
