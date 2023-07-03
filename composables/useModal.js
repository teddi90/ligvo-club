export default () => {
    const isModalVisible = ref(false);
    const showModal = () => {
        isModalVisible.value = true;
    };
    const hideModal = () => {
        isModalVisible.value = false;
    };
    return {
        isModalVisible,
        showModal,
        hideModal,
    }
};
