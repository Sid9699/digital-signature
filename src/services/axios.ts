import axios from 'axios';
// import config from '../configs/config';

const baseURL = 'https://opika-test-assesment.ownx.shop';

const axiosPublic = axios.create({
  baseURL,
});

const axiosPrivate = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosPrivate, axiosPublic };
