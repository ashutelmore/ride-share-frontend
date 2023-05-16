import React from 'react'
import { Buffer } from 'buffer';

export const isEmptyObject = (...args) => {

    const obj = args[0]
    const emptyFields = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            if (typeof value === 'string' && value.trim() === '') {
                emptyFields.push(key);
            } else if (value == null) {
                emptyFields.push(key);
            }

        }
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