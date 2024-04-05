const jsonOrdersError = (message) => {
    return {
        totalResults: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 0,
        orders: [],
        message: message,
    }

};

module.exports = jsonOrdersError;