const GlobalErrorHandler = async (err, req, res, next) => {
    let errorMessage = err.message;
    if (err.name === 'ValidationError') {
        errorMessage = err.message.slice(err.message.lastIndexOf(':') + 2);
    }
    return res.status(err.statusCode || 500).json({
        status: 'failure',
        data: { errorMessage },
    });
};
module.exports = GlobalErrorHandler;
