import axios from 'axios';
import {getToken} from './account';
import {getRefreshToken} from '../actions/AccountActions'

export const getApiUrl = (path) => {
    return `http://localhost:8000${path}`
}

export const getHeaders = () => {
    const token = getToken();
    if(!token) return {};
    return {
        Authorization : `Bearer ${token}`,
    };
};

console.log('***** token.api.helpers:', getHeaders())

export const apiRefreshToken = () => {
    const url = getApiUrl('/auth/refresh');
    const refreshToken = getRefreshToken();
    const options = {
        headers: {
            Authorization : `Bearer ${refreshToken}`,
        }
        
    };

    return axios.post(url, {}, options);

};


export const apiPost = (path, data = {}) => {
    const url = getApiUrl(path);
    const options = {
        headers: getHeaders()
    };

    return axios.post(url, data, options);

};

export const apiGet = (path)  => {
    const url = getApiUrl(path);
    const options = {
        headers: getHeaders()
    };

    return axios.get(url, options);

};


export const apiPut  = (path, data = {}) => {
    const url = getApiUrl(path);
    const options = {
        headers: getHeaders()
    };

    return axios.post(url, data, options);

};

export const apiDelete  = (path) => {
    const url = getApiUrl(path);
    const options = {
        headers: getHeaders()
    };

    return axios.delete(url, options);

};


