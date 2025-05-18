const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Handle specific error cases
    if (err.message === 'Post not found') {
        return res.status(404).json({
            status: 'error',
            message: err.message
        });
    }

    if (err.message.includes('Missing required fields') || 
        err.message.includes('already exists')) {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    // Default server error
    res.status(500).json({
        status: 'error',
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;
