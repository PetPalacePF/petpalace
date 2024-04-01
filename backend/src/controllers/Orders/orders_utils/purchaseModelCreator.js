const purchaseModelCreator = (includePurchasesClause, Purchase) => {
  let purchaseModel = {};

  Object.keys(includePurchasesClause).length !== 0
    ? (purchaseModel = {
        model: Purchase,
        attributes: ["id"],
        where: includePurchasesClause,
      })
    : (purchaseModel = {
        model: Purchase,
        attributes: ["id"],
      });
  return purchaseModel;
};

module.exports = purchaseModelCreator;
