const { Category } = require("../../db");

const modifyCategory = async (id, name) => {
  let updatedCategory = await Category.update(
    { name },
    {
      where: {
        id: id,
      },
    }
  );
  if (updatedCategory[0] === 0) {
    return { message: `Categoria ${id} no encontrada` };
  }
  updatedCategory = await Category.findByPk(id);
  return updatedCategory.dataValues;
};

module.exports = modifyCategory;
