export default () => {
    const config = useRuntimeConfig();
    const wpUri = config.public.wpUri;

    // get
    const get = async (endpoint) => {
        return useFetch(`${wpUri}/wp-json/wp/v2/${endpoint}`);
    }

    // Get All posts
    const getPosts = async () => {
        let query = `boardgames`;
        return get(query);
    }

    // Get a Single Post
    const getPost = async (slug) => get(`posts?slug=${slug}&_embed`);



    return { get, getPost, getPosts }

}
