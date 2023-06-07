const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBoard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    // cards: Joi.array().items(Joi.custom(objectId)),
    owner: Joi.custom(objectId),
  }),
};

const getBoards = {
  query: Joi.object().keys({
    owner: Joi.custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBoard = {
  params: Joi.object().keys({
    boardId: Joi.string().custom(objectId),
  }),
};

const getCards = {
  params: Joi.object().keys({
    boardId: Joi.string().custom(objectId),
  }),
};

const updateBoard = {
  params: Joi.object().keys({
    boardId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      owner: Joi.custom(objectId),
    })
    .min(1),
};

const deleteBoard = {
  params: Joi.object().keys({
    boardId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  getCards,
  updateBoard,
  deleteBoard,
};
