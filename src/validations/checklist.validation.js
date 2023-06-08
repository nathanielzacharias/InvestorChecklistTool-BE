const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    owner: Joi.custom(objectId),
    boardId: Joi.custom(objectId),
  }),
};

const getCards = {
  query: Joi.object().keys({
    boardId: Joi.custom(objectId),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCard = {
  params: Joi.object().keys({
    cardId: Joi.string().custom(objectId),
  }),
};

const getChecklistsAndToDoLists = {
  params: Joi.object().keys({
    cardId: Joi.string().custom(objectId),
  }),
};

const updateCard = {
  params: Joi.object().keys({
    cardId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      //checklists (array of objects of mongo document)
      //toDoLists (same as above)
      //note of type object of type xml
      //links of type array of type string
    })
    .min(1),
};

const deleteCard = {
  params: Joi.object().keys({
    cardId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCard,
  getCards,
  getCard,
  getChecklistsAndToDoLists,
  updateCard,
  deleteCard,
};
