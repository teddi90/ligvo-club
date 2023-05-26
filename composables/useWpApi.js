export default () => {
    const config = useRuntimeConfig();
    const wpUri = config.public.wpUri;

    // get
    const get = async (endpoint) => {
        return useFetch(`${wpUri}/wp-json/wp/v2/${endpoint}`);
    }

    // Get All posts
    const getPosts = async (categories, page = 1, perPage = 9) => {
        let query = `posts?_embed&per_page=${perPage}&page=${page}`;
        if (categories) {
            query += `&categories=${categories}`;
        }
        return get(query);
    }

    // Get a Single Post
    const getPost = async (slug) => get(`posts?slug=${slug}&_embed`);

    // Get All Categories
    const getCategories = async () => get("categories");


    // Get a Single Categories
    const getCategory = async (slug) => get(`categories?slug=${slug}`);

    return { get, getPost, getPosts, getCategories, getCategory }

}
