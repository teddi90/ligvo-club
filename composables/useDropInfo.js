export default () => {
    const resultMessage = ref("");
    const changeResultMessage = (message) => {
        resultMessage.value = message;
        setTimeout(() => {
            resultMessage.value = "";
        }, 4000);
    };
    return {
        resultMessage,
        changeResultMessage,
    }
};
