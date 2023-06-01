export const useGamesStore = defineStore('games', {
    state: () => ({
        boardGames: [],
    }),
    actions: {
        async fetchBoardGames() {
            const { data: resp } = await useWpApi().get('boardgames');
            this.boardGames = toRaw(resp.value);
        }
    },
    getters: {
        getBoardGames(state) {
            return state.boardGames
        }
    }
})
