export const errorResponse = (error, res) => {

    console.log(error);
    if(error.status) {
        return res.status(error.status).json({
            message: error.message,
            success: error.success,
        });
    }

    return res.status(500).json({
        message: 'Internal server error',
        success: false
    });
}

export const successResponse = ({ status, message, success, data, res }) => {

    return res.status(status).json({
        message: message,
        success: success,
        data: data
    });
}