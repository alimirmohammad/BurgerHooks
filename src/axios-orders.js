import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e1d54.firebaseio.com/'
});

export default instance;