require("dotenv").config();

const OWNER_EMAIL = process.env.OWNER_EMAIL || "petpalacepf@gmail.com";
const OWNER_NAME = process.env.OWNER_NAME || "Pet Palace";
const OWNER_COUNTRY = process.env.OWNER_COUNTRY || "Henry";
const OWNER_STATE = process.env.OWNER_STATE || "Cohorte Ft46-B";
const OWNER_CITY = process.env.OWNER_CITY || "Proyecto Final";
const OWNER_STREET_ADRESS = process.env.OWNER_STREET_ADRESS || "Grupo";
const OWNER_STREET_NUMBER = process.env.OWNER_STREET_NUMBER || "5";
const OWNER_ZIP_CODE = process.env.OWNER_ZIP_CODE || "420";
const OWNER_PHONE = process.env.OWNER_PHONE || "11111111";

module.exports = {
  OWNER_EMAIL,
  OWNER_NAME,
  OWNER_COUNTRY,
  OWNER_STATE,
  OWNER_CITY,
  OWNER_STREET_ADRESS,
  OWNER_STREET_NUMBER,
  OWNER_ZIP_CODE,
  OWNER_PHONE
};
