const { Database } = require("../DataBase");
const { throwError } = require("../Utils/RequestUtil");

const { User, Patient } = Database?.models;
async function VerifyUserEmailDuplicate(req, res, next) {
  console.log(req.body);
  if (!req.body) {
    return await throwError({
      local: "SERVER:VALIDATOR-USER",
      message: "Nenhum dado valido foi enviado",
      log: "Nenhum dado valido foi enviado",
    });
  }

  const userFound = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (userFound) {
    return await throwError({
      local: "SERVER:VALIDATOR-USER",
      message: "Falhou! Usuario esta em uso!",
      log: "Falhou! Usuario esta em uso!",
    });
  }

  const emailFound = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (emailFound) {
    return await throwError({
      local: "SERVER:VALIDATOR-USER",
      message: "Falhou! E-Mail esta em uso!",
      log: "Falhou! E-Mail esta em uso!",
    });
  }

  next();
}

async function VerifyExistsCPFinPatient(req, res, next) {
  if (req.body) {
    return await throwError({
      local: "SERVER:VALIDATOR-USER",
      message: "Nenhum dado valido foi enviado",
      log: "Nenhum dado valido foi enviado",
    });
  }

  const { cpf, id } = req.body;
  if (id) {
    next();
    return;
  }
  const patientFound = await Patient.findAll({
    where: {
      cpf: cpf,
    },
  });

  if (patientFound.length) {
    return await throwError({
      local: "SERVER:VALIDATOR-PATIENT",
      message: "CPF is already in use",
      log: "CPF is already in use",
    });
  }

  next();
}

export { VerifyUserEmailDuplicate, VerifyExistsCPFinPatient };
