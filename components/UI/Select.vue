<template>
    <div class="select">
        <div
            class="selector"
            @click="toggleSelect()"
            :class="{ selector_border: isVisible }"
        >
            <div class="selector__label">
                <span>{{ optionValue }}</span>
            </div>
            <div
                class="selector__arrow"
                :class="{ selector__arrow_rotated: isVisible }"
            ></div>
            <div
                :class="{
                    selector__list_hidden: !isVisible,
                    selector__list_visible: isVisible,
                }"
            >
                <ul class="selector__list">
                    <li
                        class="selector__option"
                        :class="{
                            selector__option_selected: option === optionValue,
                        }"
                        v-for="option in optionsList"
                        :key="option"
                        @click="selectOption(option)"
                    >
                        {{ option }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
    selectedOption: {
        type: String,
        default: "",
    },
    optionsList: {
        type: Array,
        default: () => [],
    },
});
// const vModel = computed({
//     get: () => props.modelValue,
//     set: (value) => {
//         emit("update:modelValue", value);
//     },
// });

const optionValue = ref(
    props.selectedOption ? props.selectedOption : props.placeholder
);
const isVisible = ref(false);

const toggleSelect = () => {
    isVisible.value = !isVisible.value;
};
const selectOption = (option) => {
    optionValue.value = option;
    emit("update:modelValue", option);
};
</script>
