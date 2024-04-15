const { OWNER_EMAIL } = require("../../../adminCredentials");

const ownerRoleValidator = (userRequesting) => {
  if (userRequesting.email !== OWNER_EMAIL) {
    return {
      error: true,
      message: `Se necesitan permisos de Owner para ingresar. El usuario con id '${userRequesting.id}' no posee los permisos correspondientes.`,
    };
  }

  const adminPermissions = userRequesting.enabled;
  if (!adminPermissions) {
    return {
      error: true,
      message: `Se necesitan permisos de Admin para ingresar. El usuario con id '${userRequesting.id}' no posee permisos de administrador.`,
    };
  }

  const userEnable = userRequesting.enabled;
  if (!userEnable) {
    return {
      error: true,
      message: `El usuario debe estar activo para ingresar. El usuario con id '${userRequesting.id}' actualmente se encuntra inhabilitado.`,
    };
  }

  return {
    error: false,
  };
};

module.exports = ownerRoleValidator;
