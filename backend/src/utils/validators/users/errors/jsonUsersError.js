const jsonUsersError = (message) => {
    return {
        totalResults: 0,
        totalPages: 0,
        currentPage: 0,
        pageSize: 0,
        users: [],
        message: message,
    }

};

module.exports = jsonUsersError;