import axios from 'axios';

function Http(options = {}) {
  const instance = axios.create(options);

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
}

export default Http;
