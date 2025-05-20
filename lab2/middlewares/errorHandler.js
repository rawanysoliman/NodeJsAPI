const APIError = require("./apiError");

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // Handle APIError
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            status: "failed",
            message: err.message
        });
    }

    // Handle duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            status: "failed",
            message: `This ${field} already exists`
        });
    }

    // Handle validation errors
    if (err.name === "ValidationError") {
        return res.status(400).json({
            status: "failed",
            message: err.message
        });
    }

    // Default server error
    res.status(500).json({
        status: "failed",
        message: "Something went wrong Internal Server Error"
    });
};

module.exports = errorHandler;