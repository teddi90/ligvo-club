<template>
    <div class="modal" v-if="isModalVisible" @click.self="hideModal">
        <div class="modal__content">
            <svg
                @click="hideModal"
                class="modal__btn_close"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M32.3707 30.6293L13.9257 13.3621L15.0579 12.2298L5.50119 6.58713L30.8256 31.9116C30.8256 31.9116 32.0695 30.6724 32.3707 30.6293Z"
                    fill="url(#paint0_linear_928_29049)"
                />
                <path
                    d="M29.5434 33.4566L12.2761 15.0116L11.1439 16.1439L5.50119 6.58713L30.8256 31.9116C30.8256 31.9116 29.5865 33.1555 29.5434 33.4566Z"
                    fill="#EABD48"
                />
                <path
                    d="M9.37066 33.3707L26.6379 14.9257L27.7702 16.0579L33.4129 6.50119L8.08843 31.8256C8.08843 31.8256 9.32756 33.0695 9.37066 33.3707Z"
                    fill="url(#paint1_linear_928_29049)"
                />
                <path
                    d="M6.5434 30.5434L24.9884 13.2761L23.8561 12.1439L33.4129 6.50119L8.08843 31.8256C8.08843 31.8256 6.84452 30.5865 6.5434 30.5434Z"
                    fill="#EABD48"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_928_29049"
                        x1="28.0344"
                        y1="23.431"
                        x2="10.2458"
                        y2="30.9693"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="#F1D04A" />
                        <stop offset="0.09" stop-color="#ECC349" />
                        <stop offset="0.23" stop-color="#E1A746" />
                        <stop offset="0.31" stop-color="#DD9E46" />
                        <stop offset="0.43" stop-color="#D38746" />
                        <stop offset="0.55" stop-color="#C76B46" />
                        <stop offset="0.79" stop-color="#4F3131" />
                        <stop offset="1" stop-color="#482C2E" />
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_928_29049"
                        x1="16.569"
                        y1="29.0344"
                        x2="9.03067"
                        y2="11.2458"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stop-color="#F1D04A" />
                        <stop offset="0.09" stop-color="#ECC349" />
                        <stop offset="0.23" stop-color="#E1A746" />
                        <stop offset="0.31" stop-color="#DD9E46" />
                        <stop offset="0.43" stop-color="#D38746" />
                        <stop offset="0.55" stop-color="#C76B46" />
                        <stop offset="0.79" stop-color="#4F3131" />
                        <stop offset="1" stop-color="#482C2E" />
                    </linearGradient>
                </defs>
            </svg>

            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(["hideModal"]);
defineProps({
    isModalVisible: {
        type: Boolean,
        default: false,
    },
});
const hideModal = (e) => {
    emit("hideModal", e.target);
};
</script>
