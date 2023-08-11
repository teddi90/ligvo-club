<template>
    <div class="drop-down-info" :class="{ show: resultMessage.length }">
        {{ resultMessage }}
    </div>
</template>

<script setup>
const props = defineProps({
    resultMessage: {
        type: String,
        default: "",
    },
});
</script>
