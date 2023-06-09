const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createToDoList = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    cardId: Joi.custom(objectId),
    freeText: Joi.string(),
    status: Joi.string().valid('Not started', 'In progress', 'Completed', 'Cancelled'),
}
};

const getToDoList = {
  params: Joi.object().keys({
    toDoListId: Joi.string().custom(objectId),
  }),
};

const updateToDoList = {
  params: Joi.object().keys({
    toDoListId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      freeText: Joi.string(),
      status: Joi.string().valid('Not started', 'In progress', 'Completed', 'Cancelled'),
    })
    .min(1),
};

const deleteToDoList = {
  params: Joi.object().keys({
    toDoListId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createToDoList,
  getToDoList,
  updateToDoList,
  deleteToDoList,
};
