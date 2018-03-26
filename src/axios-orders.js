import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rizzo-burger.firebaseio.com/'
});

export default instance;