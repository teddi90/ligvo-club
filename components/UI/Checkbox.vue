<template>
    <div class="filter__group">
        <input
            v-model="vModel"
            :value="id"
            :id="id"
            class="filter__checkbox"
            type="checkbox"
        />
        <label :for="id" class="filter__label">{{ label }}</label>
    </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
    },
    id: {
        type: String,
        requred: true,
    },
    label: {
        type: String,
        requred: true,
    },
});
const vModel = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit("update:modelValue", value);
    },
});
</script>
