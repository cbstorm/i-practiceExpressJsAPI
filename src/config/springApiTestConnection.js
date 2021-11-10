const axiosBase = require('./axios.config');

exports.SpringApiTestConnection = async () => {
    try {
        const res = await axiosBase.get('/');
        if (res.data.status === 'success') {
            console.log('SpringApi connection successfully');
        }
    } catch (error) {
        console.log('SpringApi connection failure');
    }
};
