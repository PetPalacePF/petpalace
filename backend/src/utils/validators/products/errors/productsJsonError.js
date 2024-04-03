const productsJsonError = (message) => {
    return {
        totalResults: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 0,
        products: [],
        message: message,
    }

};

module.exports = productsJsonError;