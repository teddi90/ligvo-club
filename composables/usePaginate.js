export default () => {
    const currentPage = ref(1);
    const pageSize = ref(10);

    const setCurrentPage = (page) => {
        currentPage.value = page;
        scrollToTop();
    };
    const resetCurrentPage = () => {
        currentPage.value = 1;
    };
    const paginationPrevPage = () => {
        if (currentPage.value !== 1) {
            currentPage.value--;
            scrollToTop();
        }
    };
    const paginationNextPage = (lastPage) => {
        if (currentPage.value !== lastPage.value) {
            currentPage.value++;
            scrollToTop();
        }
    };
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return {
        currentPage,
        pageSize,
        paginationPrevPage,
        paginationNextPage,
        setCurrentPage,
        resetCurrentPage,
    }
};
