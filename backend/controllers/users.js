const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { CastError } = require('../Error/CastError');
const { ValidationError } = require('../Error/ValidationError');
const { NotFoundError } = require('../Error/NotFoundError');
const { ConflictError } = require('../Error/ConflictError');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      user: {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой Email существует'));
      } else if (err.name === 'ValidationError') { next(new ValidationError('Некорректные данные')); } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => User.findById(req.params.id)
  .orFail(() => {
    next(new NotFoundError('Пользователь по указанному _id не найден'));
  })
  .then((user) => res.status(200).send(user))
  .catch((e) => {
    if (e.name === 'CastError') {
      next(new CastError('Некорректный id пользователя'));
    } else {
      next(e);
    }
  });

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Карточка с указанным id не найдена');
      }
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new CastError('Некорректный id пользователя'));
      } else if (e.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(e);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    // Передадим объект опций:
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .catch((e) => {
      if (e.name === 'NotFoundError') {
        next(new NotFoundError('Некорректный id пользователя'));
      }
    })
    .then((user) => res.send(user))
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new CastError('Некорректный id пользователя'));
      } else if (e.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные'));
      } else {
        next(e);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      // вернём токен
      return res.send({ token });
    })
    .catch(next);
};

const getMe = (req, res, next) => User.findById(req.user._id)
  .then((user) => res.status(200).send(user))
  .catch((e) => {
    if (e.name === 'CastError') {
      next(new CastError('Некорректный id пользователя'));
    } else {
      next(e);
    }
  });

module.exports = {
  createUser, getUser, getUsers, updateUserInfo, updateAvatar, login, getMe,
};
