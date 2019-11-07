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
  },

  async post(path, body) {
    return await axios.post(`${host}${path}`, body ,{ timeout: 10000 })
  },

  async delete(path, body) {
    return await axios.delete(`${host}${path}`, body ,{ timeout: 10000 })
  },

};


export default apiServices;
