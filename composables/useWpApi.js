
export default () => {
    const config = useRuntimeConfig();
    const wpUri = config.public.wpUri;

    // get
    const get = async (endpoint) => {
        return useFetch(`${wpUri}/wp-json/wp/v2/${endpoint}?per_page=100`);
    }

    // Get All games
    const getGames = async () => {
        let query = `game`;
        return get(query);
    }

    // Get a Single Game
    const getGame = async (slug) => get(`game?slug=${slug}&_embed`);

    return { get, getGame, getGames }

}
