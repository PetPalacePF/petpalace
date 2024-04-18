const { User } = require("../../db");
const findUserbyId = require("../Users/findUserbyId");
const createOrder = require("../Orders/createOrder");
const modifyOrder = require("../Orders/modifyOrder");
const formattedUser = require("../../utils/formatted/formattedUser");

const createUser = async (email, name) => {
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: { email, name },
  });

  let products = [[1]]
  const newOrder = await createOrder(products, user.id);
  let productsToAdd;
  let productsToRemove = [[1]];
  const updatedOrder = await modifyOrder(newOrder.id, productsToAdd, productsToRemove);
  console.log(updatedOrder);
  const userWithOrder = formattedUser(await findUserbyId(user.id));

  return { userWithOrder, created };
};

module.exports = createUser;
