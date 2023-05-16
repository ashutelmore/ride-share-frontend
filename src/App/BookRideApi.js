
import axios from "axios";
// const END_POINT = "https:/ / odd - pear - fox - hem.cyclic.app / api"
const END_POINT = process.env.REACT_APP_END_POINT


export const createBookings = async (data) => {

    return await axios.post(`${END_POINT}/createBookings`, { payload: data })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log('Api error', error)
            if (error.response) {
                if (error.response.data.error)//this writtern by backend dev
                    return error.response.data
                else {//this erro somethin defferent
                    const resp = {
                        error: {
                            errCode: error.code,
                            errMessage: error.message
                        }
                    }
                    return resp
                }
            } else {
                const resp = {
                    error: {
                        errCode: error.code,
                        errMessage: error.message
                    }
                }
                return resp
            }
        })

};
export const updateBookings = async (id, data) => {


    return await axios.put(`${END_POINT}/updateBookings/${id}`, { payload: data })
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log('Api error', error)
            if (error.response) {
                if (error.response.data.error)//this writtern by backend dev
                    return error.response.data
                else {//this erro somethin defferent
                    const resp = {
                        error: {
                            errCode: error.code,
                            errMessage: error.message
                        }
                    }
                    return resp
                }
            } else {
                const resp = {
                    error: {
                        errCode: error.code,
                        errMessage: error.message
                    }
                }
                return resp
            }
        })

};

export const deleteBookings = async (id) => {

    return await axios.delete(`${END_POINT}/deleteBookings/${id}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log('Api error', error)
            if (error.response) {
                if (error.response.data.error)//this writtern by backend dev
                    return error.response.data
                else {//this erro somethin defferent
                    const resp = {
                        error: {
                            errCode: error.code,
                            errMessage: error.message
                        }
                    }
                    return resp
                }
            } else {
                const resp = {
                    error: {
                        errCode: error.code,
                        errMessage: error.message
                    }
                }
                return resp
            }
        })

};

export const getBookings = async (searchQuery) => {
    // console.log('search, sort, postType, type=> ', search, sort, postType, type)
    const url = `bookingId=${searchQuery.bookingId || ''}&rideId=${searchQuery.rideId || ''}&driverId=${searchQuery.driverId || ''}&passangerId=${searchQuery.passangerId || ''}&role=${searchQuery.role || ''}`
    console.log(url)
    return await axios.get(`${END_POINT}/getBookings?${url}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log('Api error', error)
            if (error.response) {
                if (error.response.data.error)//this writtern by backend dev
                    return error.response.data
                else {//this erro somethin defferent
                    const resp = {
                        error: {
                            errCode: error.code,
                            errMessage: error.message
                        }
                    }
                    return resp
                }
            } else {
                const resp = {
                    error: {
                        errCode: error.code,
                        errMessage: error.message
                    }
                }
                return resp
            }
        })

};
export const searchBookings = async (searchQuery) => {
    const url = `_id=${searchQuery._id || ''}&vehicleId=${searchQuery.vehicleId || ''}&pickup=${searchQuery.pickup || ''}&desti=${searchQuery.desti || ''}&start=${searchQuery.start || ''}&end=${searchQuery.end || ''}`


    return await axios.get(`${END_POINT}/searchBookings?${url}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log('Api error', error)
            if (error.response) {
                if (error.response.data.error)//this writtern by backend dev
                    return error.response.data
                else {//this erro somethin defferent
                    const resp = {
                        error: {
                            errCode: error.code,
                            errMessage: error.message
                        }
                    }
                    return resp
                }
            } else {
                const resp = {
                    error: {
                        errCode: error.code,
                        errMessage: error.message
                    }
                }
                return resp
            }
        })

};

