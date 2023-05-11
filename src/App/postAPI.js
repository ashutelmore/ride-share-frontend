
import axios from "axios";
// const END_POINT = "https:/ / odd - pear - fox - hem.cyclic.app / api"
const END_POINT = process.env.REACT_APP_END_POINT


export const getAllPosts = async () => {
    return await axios.get(`${END_POINT}/getallposts`)
        .then(function (response) {

            return response.data
        })
        .catch(function (error) {
            console.log('error', error)
            return error
        })

};
export const getUserAllPosts = async (id) => {

    return await axios.get(`${END_POINT}/getallposts/${id}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error.response.data
        })

};

export const getPost = async (id) => {

    return await axios.get(`${END_POINT}/getPost/${id}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error.response.data
        })

};


export const createPost = async (data) => {
    const payload = { payload: { ...data } }
    // return
    return await axios.post(`${END_POINT}/createpost`, payload)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('error :>> ', error);
            return error.response.data
        });
};

export const updatePost = async (id, data) => {

    const payload = {
        payload: data
    }
    // return
    console.log('payload', payload)
    return await axios.put(`${END_POINT}/updatePosts/${id}`, payload)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('error :>> ', error);
            return error.response.data
        });
};


export const searchPost = async ({ search, sort, postType, type, page, limit, category }) => {
    // console.log('search, sort, postType, type=> ', search, sort, postType, type)
    const url = `search=${search}&sort=${sort}&type=${type}&limit=${limit}&postType=${postType}&page=${page}&category=${category}`

    return await axios.get(`${END_POINT}/search?${url}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error.response.data
        })

};

