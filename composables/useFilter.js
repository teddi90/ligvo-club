export default () => {
    const isFilterVisible = ref(false);
    const filter = ref({
        category: "",
        durations: [],
        quantityOfPlayers: [],
        difficulties: [],
    });
    const filteredGames = ref([]);

    const getFilteredGames = (games) => {
        filteredGames.value = games;
    };

    const updateFilter = (options) => {
        filter.value = options;
    };
    const getAmountOfUsedFilterOptions = computed(() => {
        return (
            filter.value.durations.length +
            filter.value.quantityOfPlayers.length +
            filter.value.difficulties.length
        );
    });
    const showFilter = () => {
        isFilterVisible.value = true;
    };
    const hideFilter = () => {
        isFilterVisible.value = false;
    };
    return {
        isFilterVisible,
        filter,
        filteredGames,
        getFilteredGames,
        updateFilter,
        getAmountOfUsedFilterOptions,
        showFilter,
        hideFilter
    }
};
