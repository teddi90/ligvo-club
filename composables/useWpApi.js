export default () => {
    const config = useRuntimeConfig();
    const wpUri = config.public.wpUri;

    // get
    const get = async (endpoint) => {
        return useFetch(`${wpUri}/wp-json/wp/v2/${endpoint}`);
    }

    // Get All games
    const getGames = async () => {
        let query = `games`;
        return get(query);
    }

    // Get a Single Game
    const getGame = async (slug) => get(`games?slug=${slug}&_embed`);

    return { get, getGame, getGames }

}
