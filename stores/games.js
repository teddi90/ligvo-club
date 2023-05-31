export const useGamesStore = defineStore('games', {
    state: () => ({
        boardGames: [],
    }),
    actions: {
        async fetchBoardGames() {
            // const { data: resp } = await useWpApi().get('boardgames');
            // this.boardGames = resp.value;
            // console.log(data.value)
            const { data: resp } = await useFetch('https://ligvo-cms.grt-team.com/wp-json/wp/v2/boardgames');
            this.boardGames = toRaw(resp.value);
            console.log(resp);
        }
    },
    getters: {
        getBoardGames(state) {
            return state.boardGames
        }
    }
})
