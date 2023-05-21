import React from 'react'
import { Buffer } from 'buffer';

export const isEmptyObject = (...args) => {
    console.log('args', args)
    const obj = args[0]
    const exceptArrKey = args[1] || []
    const emptyFields = [];

    for (let key in obj) {
        if (exceptArrKey.includes(key))
            continue
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'string' && value.trim() === '') {
                emptyFields.push(key);
            } else if (value == null) {
                emptyFields.push(key);
            }

        }
    }
    if (emptyFields.length == 0) {
        return false
    }
    return emptyFields;
};
export const isEmptyField = (...args) => {

    console.log('args', args)
    for (let index = 0; index < args.length; index++) {
        const e = args[index];
        if (e == '')
            return 1
        else if (e == null)
            return 1
    }
    return 0;
};


export const formatDateYMD = (dateString) => {
    const dateObj = new Date(dateString);

    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getUTCDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}
export const formatDateToShow = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = dateObj.toLocaleString('en-US', options);
    return formattedDate;
}

export const isEmptyObj = (obj) => {
    for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            return false;
        }
    }

    return JSON.stringify(obj) === JSON.stringify({});
}

export const bufferToImage = (bufferData) => {
    return `data:${bufferData.image.contentType};base64, ${Buffer.from(bufferData.image.data.data).toString('base64')}`
};

export const validatePassword = (password) => {
    // Password should have at least 8 characters
    if (password.length < 8) {
        return false;
    }

    // Password should contain at least one lowercase letter
    // if (!/[a-z]/.test(password)) {
    //     return false;
    // }

    // // Password should contain at least one uppercase letter
    // if (!/[A-Z]/.test(password)) {
    //     return false;
    // }

    // // Password should contain at least one digit
    // if (!/[0-9]/.test(password)) {
    //     return false;
    // }

    // Password is valid
    return true;
}
export const validateMobileNumber = (number) => {
    // Password should have at least 8 characters

    var pattern = /^[6-9]\d{9}$/;
    return pattern.test(number);

}
