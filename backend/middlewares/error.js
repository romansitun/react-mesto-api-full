module.exports = (e, req, res, next) => {
  const { statusCode = 500, message } = e;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });

  next();
};
