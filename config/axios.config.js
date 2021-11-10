const axios = require('axios');

const axiosBase = axios.create({
    baseURL: `${process.env.SPRING_API_URL}/api`,
    headers: {
        'Content-type': 'application/json',
    },
});

module.exports = axiosBase;
