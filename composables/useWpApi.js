
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

    // Send User Phone and Date
    const sendUserTinderApplication = async (game, phone) => {
        const userApplications = game.user_applications ? JSON.parse(game.user_applications) : [];
        let [month, day, year] = new Date().toLocaleDateString().split('/');
        month = month < 10 ? '0' + month : month;
        const formatedDate = `${day}.${month}.${year}`;
        userApplications.push({ user_phone: phone, date: formatedDate });
        await useFetch(
            `${wpUri}/wp-json/wp/v2/game/${game.id}`,
            {
                method: "POST",
                body: { user_applications: JSON.stringify(userApplications) },
                headers: {
                    Authorization:
                        "Basic " + btoa(`${wpUserName}:${wpUserPassword}`),
                },
            }
        );
    }

    return { get, getGame, getGames, incrementFieldValueById, sendUserTinderApplication }

}
