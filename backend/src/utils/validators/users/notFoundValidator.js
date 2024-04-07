const notFoundValidator = (queryInputs) => {
  const { name_or_email } = queryInputs;

  if (name_or_email !== "") {
    return `No se ha encontrado ningún Usuario que contenga un nombre o email que coincida con la palabra '${name_or_email}'`;
  }
};

module.exports = notFoundValidator;
