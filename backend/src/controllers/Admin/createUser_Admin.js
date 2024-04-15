const { User } = require("../../db");
const {
  OWNER_EMAIL,
  OWNER_NAME,
  OWNER_COUNTRY,
  OWNER_STATE,
  OWNER_CITY,
  OWNER_STREET_ADRESS,
  OWNER_STREET_NUMBER,
  OWNER_ZIP_CODE,
  OWNER_PHONE,
} = require("../../adminCredentials");

const createUser = async () => {
  const email = OWNER_EMAIL;
  const name = OWNER_NAME;
  const country = OWNER_COUNTRY;
  const state = OWNER_STATE;
  const city = OWNER_CITY;
  const street_address = OWNER_STREET_ADRESS;
  const street_number = OWNER_STREET_NUMBER;
  const ZIP_Code = OWNER_ZIP_CODE;
  const phone = OWNER_PHONE;
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      admin: true,
      email,
      name,
      country,
      state,
      city,
      street_address,
      street_number,
      ZIP_Code,
      phone,
    },
  });

  return { user, created };
};

module.exports = createUser;
