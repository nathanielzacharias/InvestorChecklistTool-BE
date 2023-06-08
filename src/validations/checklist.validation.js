const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createChecklist = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    owner: Joi.custom(objectId),
    boardId: Joi.custom(objectId),
    cardId: Joi.custom(objectId),
    global: Joi.boolean(),
    rating: Joi.string(),
    columnPosition: Joi.number().integer(),
  }),
};

const getChecklist = {
  params: Joi.object().keys({
    checklistId: Joi.string().custom(objectId),
  }),
};

const updateChecklist = {
  params: Joi.object().keys({
    cardId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      global: Joi.boolean(),
      rating: Joi.string(),
      columnPosition: Joi.number().integer(),
    })
    .min(1),
};

const deleteChecklist = {
  params: Joi.object().keys({
    cardId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createChecklist,
  getChecklist,
  updateChecklist,
  deleteChecklist,
};
