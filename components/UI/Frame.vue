<template>
    <div class="frame" :class="{ down: downFrame }">
        <img class="frame__img" src="~/assets/img/arrows.png" alt="Arrows" />
    </div>
</template>

<script setup>
defineProps({
    downFrame: Boolean,
    default: false,
});
</script>
