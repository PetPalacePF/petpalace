const jsonPurchasesError = (message) => {
    return {
        totalResults: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 0,
        purchases: [],
        message: message,
    }

};

module.exports = jsonPurchasesError;