
export default () => {
    const config = useRuntimeConfig();
    const wpUri = config.public.wpUri;
    const wpUserName = config.public.wpApiUserName;
    const wpUserPassword = config.public.wpApiUserPassword;

    // get
    const get = async (endpoint) => {
        return useFetch(`${wpUri}/wp-json/wp/v2/${endpoint}`);
    }

    // Get All games
    const getGames = async () => {
        let query = `game`;
        return get(query);
    }

    // Get a Single Game
    const getGame = async (slug) => get(`game?slug=${slug}&_embed`);

    // Increment value of field 
    const incrementFieldValueById = async (field, id, currentValue) => {
        let body = {};
        body[field] = +currentValue + 1;
        await useFetch(
            `${wpUri}/wp-json/wp/v2/game/${id}`,
            {
                method: "POST",
                body,
                headers: {
                    Authorization:
                        "Basic " + btoa(`${wpUserName}:${wpUserPassword}`),
                },
            }
        );
    }

    return { get, getGame, getGames, incrementFieldValueById }

}
