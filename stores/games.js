export const useGamesStore = defineStore('games', {
    state: () => ({
        boardGames: [],
        isFetchingData: false,
    }),
    actions: {
        async fetchBoardGames() {
            this.isFetchingData = true;
            const { data: resp } = await useWpApi().get('boardgames');
            this.boardGames = toRaw(resp.value);
            this.isFetchingData = false;

        }
    },
    getters: {
        getBoardGames(state) {
            return state.boardGames
        }
    }
})
