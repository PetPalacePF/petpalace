const findAllBrands = require("../../../controllers/Brands/findAllBrands");


const getBrands = async (req, res) => {
  try {
    const brands = await findAllBrands();
    if(brands.length === 0){
      return res.status(404).send("La tabla de Productos se encuentra vacía, no hay marcas para mostrar.");
    }
    return res.status(200).json({brands : brands});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getBrands;
