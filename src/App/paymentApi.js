import React from "react";
import axios from "axios";
const END_POINT = process.env.REACT_APP_END_POINT


export const createPayment = async (data) => {
    const payload = { payload: data }

    // return
    return await axios.post(`${END_POINT}/createPayment`, payload)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('error :>> ', error);
            return error.response.data
        });
};
export const updatePayment = async (id, data) => {
    const payload = {
        payload: data
    }
    // return
    return await axios.put(`${END_POINT}/updatePayment/${id}`, payload)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log('error :>> ', error);
            return error.response.data
        });
};
export const getPayment = async (id) => {

    return await axios.get(`${END_POINT}/getPayment/${id}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error.response.data
        })

};