const {Category}  = require("../../db");

const modifyCategory = async (id,name) => {

const updatedCategory = await Category.update({name}, {
    where: {
        id: id
    }
})
return updatedCategory;
};

module.exports = modifyCategory;