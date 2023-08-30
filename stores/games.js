export const useGamesStore = defineStore('games', {
    state: () => ({
        allGames: [],
        isFetchingData: false,
        categories: [
            { name: 'Настільні ігри', id: 'board_game' },
            { name: 'Рольові ігри', id: 'role_game' },
            { name: 'МТГ', id: 'mtg' },
            { name: 'Варгейми', id: 'war_game' }],
        durations: [
            { name: 'до 1 год', id: '0-60' },
            { name: '1-2 год', id: '60-120' },
            { name: '2 год і більше', id: '120-480' },
        ],
        quantityOfPlayers: [
            { name: '1-4 гравців', id: '1-4' },
            { name: '4-6 гравців', id: '4-6' },
            { name: '6-10 гравців', id: '6-10' },
            { name: '10-15 гравців', id: '10-15' },
            { name: '16 і більше', id: '16-100' },
        ],
        difficulties: [
            { name: 'Легка гра', id: 'easy' },
            { name: 'Середня складність', id: 'medium' },
            { name: 'Висока складність', id: 'hard' }],
        // filter: {
        //     category: '',
        //     durations: [],
        //     quantityOfPlayers: [],
        //     difficulties: [],
        // }
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
        getBoardGames(state) {
            return state.allGames
                .filter((game) => (game.game_category[0] === "board_game"));
        },
        getRoleGames(state) {
            return state.allGames
                .filter((game) => { game.game_category[0] === "role_game" });
        },
        getMtgGames(state) {
            return state.allGames
                .filter((game) => { game.game_category[0] === "mtg" });
        },
        getWarGames(state) {
            return state.allGames
                .filter((game) => { game.game_category[0] === "war_game" });
        },
        // isFilterHasValues(state) {
        //     return !!(state.filter.category || state.filter.durations.length || state.filter.quantityOfPlayers.length || state.filter.difficulties.length)
        // },
        // filteredGames(state) {
        //     if (!this.isFilterHasValues) {
        //         return state.allGames;
        //     }
        //     return state.allGames
        //         .filter((game) => {
        //             return state.filter.category ? game.game_category[0] === state.filter.category : true;
        //         })
        //         .filter((game) => {
        //             return state.filter.difficulties.length ? state.filter.difficulties.includes(game.difficult[0]) : true;
        //         })
        //         .filter((game) => {
        //             return state.filter.durations.length ? state.filter.durations.filter((duration) => {
        //                 const durationsArr = duration.split('-');
        //                 return +game.duration >= +durationsArr[0] + 1 && +game.duration <= +durationsArr[1] + 1
        //             }).length : true;
        //         })
        //         .filter((game) => {
        //             return state.filter.quantityOfPlayers.length ? state.filter.quantityOfPlayers.filter((quantity) => {
        //                 const quantityArr = quantity.split('-');
        //                 // const param1 = +game.min_players >= +quantityArr[0] && +game.min_players <= +quantityArr[1];
        //                 // const param2 = +game.max_players >= +quantityArr[0] && +game.max_players <= +quantityArr[1];
        //                 // return param1 || param2
        //                 const quanArr = Array.from({ length: +quantityArr[1] - +quantityArr[0] + 1 }, (_, index) => +quantityArr[0] + index);
        //                 const gameArr = Array.from({ length: +game.max_players - +game.min_players + 1 }, (_, index) => +game.min_players + index);
        //                 return quanArr.some(game => gameArr.includes(game));
        //             }).length : true;
        //         })
        // },
        // getCountOfUsedFilterOptions(state) {
        //     // return state.filter.category ?
        //     //     1 + state.filter.durations.length + state.filter.quantityOfPlayers.length + state.filter.difficulties.length
        //     //     : state.filter.durations.length + state.filter.quantityOfPlayers.length + state.filter.difficulties.length;
        //     return state.filter.durations.length + state.filter.quantityOfPlayers.length + state.filter.difficulties.length;

        // }
    },
})
