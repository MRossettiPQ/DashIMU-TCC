exports.throwErrorIf = ({
  cond = true,
  message = 'Error!!',
  console = null,
  res,
}) => {
  if (console !== null) {
    console.log(console)
  }
  if (cond) {
    res.status(500).send({
      message: message,
    })
  }
}

exports.throwError = ({ message = 'Error!!', console = null, res }) => {
  if (console !== null) {
    console.log(console)
  }
  res.status(500).send({
    message: message,
  })
}

exports.throwSuccess = ({
  content = null,
  message = null,
  console = null,
  res,
}) => {
  if (console !== null) {
    console.log(console)
  }
  res.status(200).send({
    content: content,
    message: message,
  })
}

exports.throwForbidden = ({ message = null, console = null, res }) => {
  if (console !== null) {
    console.log(console)
  }
  res.status(403).send({
    message: message,
  })
}

exports.throwForbiddenIf = ({
  cond = true,
  message = null,
  console = null,
  res,
}) => {
  if (console !== null) {
    console.log(console)
  }
  if (cond) {
    res.status(403).send({
      message: message,
    })
  }
}

exports.throwNotFoundIf = ({
  cond = true,
  message = null,
  console = null,
  res,
}) => {
  if (console !== null) {
    console.log(console)
  }
  if (cond) {
    res.status(404).send({
      message: message,
    })
  }
}

exports.throwNotFound = ({ message = null, console = null, res }) => {
  if (console !== null) {
    console.log(console)
  }
  res.status(404).send({
    message: message,
  })
}

exports.throwUnauthorized = ({ message = null, console = null, res }) => {
  if (console !== null) {
    console.log(console)
  }
  res.status(404).send({
    message: message,
  })
}
