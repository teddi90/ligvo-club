export const useGamesStore = defineStore('games', {
    state: () => ({
        allGames: [],
        isFetchingData: false,
        isModalVisible: false,
        categories: [
            { name: 'Настільні ігри', id: 'board_game' },
            { name: 'Рольові ігри', id: 'role_game' },
            { name: 'МТГ', id: 'mtg' },
            { name: 'Варгейми', id: 'war_game' }],
        durations: [
            { name: 'до 1 год', id: '0-60' },
            { name: 'до 2 год', id: '0-120' },
            { name: '2-4 год', id: '120-240' },
            { name: '4-6 год', id: '241-360' },
        ],
        quantityOfPlayers: [
            { name: '1-4 гравців', id: '1-4' },
            { name: '4-6 гравців', id: '4-6' },
            { name: '6-10 гравців', id: '6-10' },
            { name: '10-15 гравців', id: '10-15' },
            { name: '15 і більше', id: '15-100' },
        ],
        difficulties: [
            { name: 'Легка гра', id: 'easy' },
            { name: 'Середня складність', id: 'medium' },
            { name: 'Висока складність', id: 'hard' }],
        filter: {
            category: '',
            durations: [],
            quantityOfPlayers: [],
            difficulties: [],
        }
    }),
    actions: {
        async fetchAllGames() {
            this.isFetchingData = true;
            const { data: resp } = await useWpApi().getGames();
            this.allGames = toRaw(resp.value);
            this.isFetchingData = false;
        }
    },
    getters: {
        getAllGames(state) {
            return state.allGames
        },
        isFilterHasValues(state) {
            return !!(state.filter.category || state.filter.durations.length || state.filter.quantityOfPlayers.length || state.filter.difficulties.length)
        },
        filteredGames(state) {
            if (!this.isFilterHasValues) {
                return state.allGames;
            }
            return state.allGames
                .filter((game) => {
                    return state.filter.category ? game.acf.category === state.filter.category : true;
                })
                .filter((game) => {
                    return state.filter.difficulties.length ? state.filter.difficulties.includes(game.acf.difficult) : true;
                })
                .filter((game) => {
                    return state.filter.durations.length ? state.filter.durations.filter((duration) => {
                        const durationsArr = duration.split('-');
                        return +game.acf.duration >= +durationsArr[0] && +game.acf.duration <= +durationsArr[1]
                    }).length : true;
                })
                .filter((game) => {
                    return state.filter.quantityOfPlayers.length ? state.filter.quantityOfPlayers.filter((quantity) => {
                        const quantityArr = quantity.split('-');
                        return +game.acf.min_players >= +quantityArr[0] && +game.acf.max_players <= +quantityArr[1]
                    }).length : true;
                })
        },
        getCountOfUsedFilterOptions(state) {
            return state.filter.category ?
                1 + state.filter.durations.length + state.filter.quantityOfPlayers.length + state.filter.difficulties.length
                : state.filter.durations.length + state.filter.quantityOfPlayers.length + state.filter.difficulties.length;

        }
    },
})
