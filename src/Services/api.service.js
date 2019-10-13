import axios from 'axios';

const host = 'http://localhost:3000';

const apiServices = {
  async get(path, body) {
    return axios.request({
      method: 'GET',
      url: `${host}${path}`,
      headers: {
      },
      params: {
        body
      },
    })
  }
};

export default apiServices;
